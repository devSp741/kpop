import pool from '../config/db.js';
import { execSync } from 'child_process';

/**
 * Fetch Instagram HTML using curl IPv4 to prevent Node undici IPv6 socket timeouts
 */
function fetchInstagramHtml(url) {
  try {
    const cmd = `curl -4 -s -L --max-time 10 -A "Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)" "${url}"`;
    return execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
  } catch (err) {
    return null;
  }
}

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
        const html = fetchInstagramHtml(profileUrl);
        if (!html) continue;
        
        // Extract all direct post matches (/p/CODE or /reel/CODE)
        const matches = html.match(/\/p\/[A-Za-z0-9_-]+/g) || html.match(/\/reel\/[A-Za-z0-9_-]+/g) || [];
        const uniquePostPaths = [...new Set(matches)];

        const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
        const descText = descMatch ? descMatch[1].replace(/&#064;/g, '@').replace(/&#x2022;/g, '•') : '';
        const cleanDescText = descText ? descText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/gu, '').trim() : '';

        let displayDesc = '';
        if (cleanDescText && !cleanDescText.includes('Followers') && !cleanDescText.includes('See Instagram photos') && !cleanDescText.includes('Following')) {
          displayDesc = cleanDescText.slice(0, 80);
        }

        // Extract potential publication date from HTML metadata tags if present
        const dateMatch = html.match(/meta [^>]*property="og:updated_time" [^>]*content="([^"]+)"/i) ||
                          html.match(/meta [^>]*itemprop="uploadDate" [^>]*content="([^"]+)"/i) ||
                          html.match(/"uploadDate":"([^"]+)"/i);
        let actualPostDate = new Date();
        if (dateMatch && dateMatch[1]) {
          const parsed = new Date(dateMatch[1]);
          if (!isNaN(parsed.getTime())) {
            actualPostDate = parsed;
          }
        }
        const formattedDate = actualPostDate.toISOString().slice(0, 19).replace('T', ' ');

        // Always process ONLY index 0 (the single latest post on the profile)
        const targetPostPaths = uniquePostPaths.length > 0 ? [uniquePostPaths[0]] : [];

        if (targetPostPaths.length > 0) {
          const postPath = targetPostPaths[0];
          const fullPostUrl = `https://www.instagram.com${postPath.replace(/\/$/, '')}/`;
          const altPostUrl = `https://www.instagram.com${postPath}`;
          const postTitle = displayDesc 
            ? `${artist.name} (${handleName}): ${displayDesc}`
            : `${artist.name} (${handleName}): Shared a new Instagram post`;

          // Check if this exact latest post URL or generic summary_title already exists in DB for this artist
          const [existing] = await pool.query(
            `SELECT id FROM activity_events WHERE artist_id = ? AND platform = 'instagram' AND (source_url = ? OR source_url = ? OR summary_title = ?)`,
            [artist.id, fullPostUrl, altPostUrl, postTitle]
          );

          if (existing.length === 0) {
            // Insert brand new Instagram post notification into database (history preserved)
            await pool.query(
              `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
               VALUES (?, 'instagram', 'POST', ?, ?, ?, ?)`,
              [artist.id, postTitle, artist.avatar_url, fullPostUrl, formattedDate]
            );
            syncResults.push({ artistId: artist.id, artistName: artist.name, handle: handleName, postUrl: fullPostUrl, status: 'synced_new_post' });
          }
        } else {
          // Fallback to profile URL ONLY if artist has zero instagram events in database
          const [hasEvents] = await pool.query(
            `SELECT id FROM activity_events WHERE artist_id = ? AND platform = 'instagram'`,
            [artist.id]
          );

          if (hasEvents.length === 0) {
            const targetPostUrl = (instagramData.latest_post_url || instagramData.post_url || profileUrl).replace(/\/$/, '') + '/';
            const postTitle = displayDesc 
              ? `${artist.name} (${handleName}): ${displayDesc}`
              : `${artist.name} (${handleName}): Shared a new Instagram post`;

            await pool.query(
              `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
               VALUES (?, 'instagram', 'POST', ?, ?, ?, ?)`,
              [artist.id, postTitle, artist.avatar_url, targetPostUrl, formattedDate]
            );
            syncResults.push({ artistId: artist.id, artistName: artist.name, handle: handleName, postUrl: targetPostUrl, status: 'synced_new_post' });
          }
        }

        // 2000ms (2 seconds) delay between requests to protect IP from Instagram rate limits
        await new Promise(resolve => setTimeout(resolve, 2000));
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

    const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(
      `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at)
       VALUES (?, 'instagram', 'POST', ?, ?, ?, ?)`,
      [artist.id, postTitle, artist.avatar_url, targetUrl, formattedDate]
    );

    return true;
  } catch (error) {
    console.error('Error in ingestInstagramPostWebhook:', error);
    return false;
  }
}
