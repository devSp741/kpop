import pool from '../config/db.js';

/**
 * TikTok Sync Service for K-Pop Radar
 * 
 * Inspects public TikTok artist handles/pages directly
 * and updates activity events with live dance challenges & clips.
 */

/**
 * Sync TikTok activity events for active artists
 * @param {number|null} artistId - Optional artist ID
 */
export async function syncTikTokFeed(artistId = null) {
  try {
    if (process.env.ENABLE_BACKGROUND_SYNC === 'false') {
      return { success: true, count: 0, paused: true, message: 'TikTok sync paused via ENABLE_BACKGROUND_SYNC=false' };
    }

    let query = `
      SELECT id, name, slug, official_handles, avatar_url 
      FROM artists 
      WHERE is_active = 1
    `;
    const queryParams = [];

    if (artistId) {
      query += ` AND id = ?`;
      queryParams.push(artistId);
    }

    const [artists] = await pool.query(query, queryParams);
    if (!artists || artists.length === 0) {
      return { success: true, count: 0, results: [] };
    }

    const syncResults = [];

    for (const artist of artists) {
      let handles = {};
      try {
        handles = typeof artist.official_handles === 'string'
          ? JSON.parse(artist.official_handles)
          : (artist.official_handles || {});
      } catch (e) {
        handles = {};
      }

      const tiktokData = handles.tiktok || {};
      const handleName = tiktokData.handle || null;
      const profileUrl = tiktokData.url || (handleName ? `https://www.tiktok.com/${handleName}` : null);

      if (!profileUrl || profileUrl === 'https://www.tiktok.com/' || profileUrl === '#') {
        continue;
      }

      try {
        const res = await fetch(profileUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });

        if (!res.ok) {
          continue;
        }

        const html = await res.text();
        const matches = html.match(/\/video\/[0-9]+/g) || [];
        const uniqueVideoPaths = [...new Set(matches)];

        const dateMatch = html.match(/"uploadDate":"([^"]+)"/i) || html.match(/"createTime":"?([0-9]+)"?/i);
        let actualPostDate = new Date();
        if (dateMatch && dateMatch[1]) {
          const val = dateMatch[1];
          const parsed = isNaN(Number(val)) ? new Date(val) : new Date(Number(val) * 1000);
          if (!isNaN(parsed.getTime())) {
            actualPostDate = parsed;
          }
        }
        const formattedDate = actualPostDate.toISOString().slice(0, 19).replace('T', ' ');

        const targetVideoPaths = uniqueVideoPaths.length > 0 ? [uniqueVideoPaths[0]] : [];

        if (targetVideoPaths.length > 0) {
          for (let i = 0; i < targetVideoPaths.length; i++) {
            const videoPath = targetVideoPaths[i];
            const fullVideoUrl = `${profileUrl.replace(/\/$/, '')}${videoPath}`;
            const videoTitle = `${artist.name} posted a dance challenge clip on TikTok`;

            const [existing] = await pool.query(
              `SELECT id FROM activity_events WHERE artist_id = ? AND platform = 'tiktok' AND (source_url = ? OR summary_title = ?)`,
              [artist.id, fullVideoUrl, videoTitle]
            );

            if (existing.length === 0) {
              await pool.query(
                `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
                 VALUES (?, 'tiktok', 'DANCE_CHALLENGE', ?, ?, ?, ?)`,
                [artist.id, videoTitle, artist.avatar_url, fullVideoUrl, formattedDate]
              );
              syncResults.push({ artistId: artist.id, artistName: artist.name, handle: handleName, videoUrl: fullVideoUrl, status: 'synced_new_tiktok' });
            }
          }
        }

        // 1500ms delay between TikTok requests to prevent IP rate-limiting
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (err) {
        console.error(`TikTok Live Fetch Error for ${artist.name}:`, err.message);
      }
    }

    return { success: true, results: syncResults };
  } catch (error) {
    console.error('TikTok Sync Service Error:', error.message);
    throw error;
  }
}
