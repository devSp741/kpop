import pool from '../config/db.js';

/**
 * Instagram Direct Sync Service for K-Pop Radar & Creator Tracking
 * 
 * Inspects public Instagram handles directly from Instagram servers
 * and extracts real direct post links (/p/SHORTCODE/) for instant accurate notifications.
 */

/**
 * Sync Instagram activity events for a specific artist or all active artists
 * @param {number|null} artistId - Optional artist ID
 */
export async function syncInstagramFeed(artistId = null) {
  try {
    if (process.env.ENABLE_BACKGROUND_SYNC === 'false') {
      return { success: true, count: 0, paused: true, message: 'Instagram sync paused via ENABLE_BACKGROUND_SYNC=false' };
    }

    let query = `SELECT id, name, slug, official_handles, avatar_url FROM artists WHERE is_active = 1 ORDER BY id DESC`;
    const queryParams = [];

    if (artistId) {
      query += ` AND id = ?`;
      queryParams.clear ? queryParams.clear() : null;
      query = `SELECT id, name, slug, official_handles, avatar_url FROM artists WHERE is_active = 1 AND id = ?`;
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

      const instagramData = handles.instagram || {};
      const handleName = instagramData.handle || null;
      const profileUrl = instagramData.url || (handleName ? `https://www.instagram.com/${handleName.replace('@', '')}/` : null);

      if (!profileUrl || profileUrl === 'https://www.instagram.com/' || !handleName) {
        continue;
      }

      try {
        // Fetch Instagram profile using Bingbot crawler headers to extract real post URLs directly
        const res = await fetch(profileUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)',
            'Accept-Language': 'en-US,en;q=0.9'
          }
        });

        if (!res.ok) {
          continue;
        }

        const html = await res.text();
        
        // Extract all direct post matches (/p/CODE or /reel/CODE)
        const matches = html.match(/\/p\/[A-Za-z0-9_-]+/g) || html.match(/\/reel\/[A-Za-z0-9_-]+/g) || [];
        const uniquePostPaths = [...new Set(matches)];

        const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
        const descText = descMatch ? descMatch[1].replace(/&#064;/g, '@').replace(/&#x2022;/g, '•') : '';
        const cleanDescText = descText ? descText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim() : '';

        if (uniquePostPaths.length > 0) {
          // Process extracted direct post URLs
          for (let i = 0; i < uniquePostPaths.length; i++) {
            const postPath = uniquePostPaths[i];
            const fullPostUrl = `https://www.instagram.com${postPath}/`;
            const postTitle = `${artist.name} (${handleName}): New Instagram Post ${cleanDescText ? `(${cleanDescText})` : ''}`;

            // Check if this exact post URL already exists in DB
            const [existing] = await pool.query(
              `SELECT id FROM activity_events WHERE artist_id = ? AND platform = 'instagram' AND source_url = ?`,
              [artist.id, fullPostUrl]
            );

            if (existing.length === 0) {
              await pool.query(
                `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
                 VALUES (?, 'instagram', 'POST', ?, ?, ?, NOW() - INTERVAL ? SECOND)`,
                [artist.id, postTitle, artist.avatar_url, fullPostUrl, i * 5]
              );
              syncResults.push({ artistId: artist.id, artistName: artist.name, handle: handleName, postUrl: fullPostUrl, status: 'synced_new_post' });
            }
          }
        } else {
          // Fallback to profile URL if no direct post path found in crawler HTML
          const targetPostUrl = instagramData.latest_post_url || instagramData.post_url || profileUrl;
          const postTitle = `${artist.name} (${handleName}): New Instagram Post ${cleanDescText ? `(${cleanDescText})` : ''}`;

          const [existing] = await pool.query(
            `SELECT id FROM activity_events WHERE artist_id = ? AND platform = 'instagram' AND summary_title = ?`,
            [artist.id, postTitle]
          );

          if (existing.length === 0) {
            await pool.query(
              `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
               VALUES (?, 'instagram', 'POST', ?, ?, ?, NOW())`,
              [artist.id, postTitle, artist.avatar_url, targetPostUrl]
            );
            syncResults.push({ artistId: artist.id, artistName: artist.name, handle: handleName, postUrl: targetPostUrl, status: 'synced_new_post' });
          }
        }

        // Small 250ms delay between requests to respect Instagram rate limits
        await new Promise(resolve => setTimeout(resolve, 250));
      } catch (err) {
        console.error(`Instagram sync error for ${artist.name}:`, err.message);
      }
    }

    return { success: true, count: syncResults.length, results: syncResults };
  } catch (error) {
    console.error('Error in syncInstagramFeed:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Ingest Instagram Post Webhook / Direct Post Link
 */
export async function ingestInstagramPostWebhook({ artistId, handle, postUrl, caption }) {
  try {
    let targetArtistId = artistId;
    if (!targetArtistId && handle) {
      const cleanHandle = handle.replace('@', '');
      const [artists] = await pool.query(
        `SELECT id FROM artists WHERE JSON_EXTRACT(official_handles, '$.instagram.handle') LIKE ? OR slug = ?`,
        [`%${cleanHandle}%`, cleanHandle]
      );
      if (artists.length > 0) targetArtistId = artists[0].id;
    }

    if (!targetArtistId) return false;

    const [artistRows] = await pool.query(`SELECT id, name, official_handles, avatar_url FROM artists WHERE id = ?`, [targetArtistId]);
    if (artistRows.length === 0) return false;
    const artist = artistRows[0];

    const cleanCaption = caption ? caption.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim() : '';

    const postTitle = `${artist.name}: New Instagram Post ${cleanCaption ? `(${cleanCaption})` : ''}`;
    const targetUrl = postUrl || `https://www.instagram.com/${artist.slug}/`;

    await pool.query(
      `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
       VALUES (?, 'instagram', 'POST', ?, ?, ?, NOW())`,
      [artist.id, postTitle, artist.avatar_url, targetUrl]
    );

    return true;
  } catch (error) {
    console.error('Error in ingestInstagramPostWebhook:', error);
    return false;
  }
}
