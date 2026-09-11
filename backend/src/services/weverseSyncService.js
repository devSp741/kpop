import pool from '../config/db.js';

/**
 * Weverse Sync Service for K-Pop Radar
 * 
 * Pure Production Data Engine:
 * Fetches real artist community activity events directly from database & live endpoints.
 * ZERO hardcoded catalogs, ZERO custom dictionaries, ZERO fallback mock arrays.
 */

/**
 * Sync Weverse community activity events for active artists
 * @param {number|null} artistId - Optional artist ID. If null, syncs for all active artists.
 */
export async function syncWeverseFeed(artistId = null) {
  try {
    if (process.env.ENABLE_BACKGROUND_SYNC === 'false') {
      return { success: true, count: 0, paused: true, message: 'Weverse sync paused via ENABLE_BACKGROUND_SYNC=false' };
    }

    let query = `
      SELECT 
        a.id, 
        a.name, 
        a.slug, 
        a.type, 
        a.parent_artist_id, 
        a.official_handles, 
        a.avatar_url,
        p.name as parent_name,
        p.slug as parent_slug,
        p.official_handles as parent_official_handles
      FROM artists a
      LEFT JOIN artists p ON a.parent_artist_id = p.id
      WHERE a.is_active = 1
    `;
    const queryParams = [];

    if (artistId) {
      query += ` AND a.id = ?`;
      queryParams.push(artistId);
    }

    const [artists] = await pool.query(query, queryParams);
    if (!artists || artists.length === 0) {
      return { success: true, results: [] };
    }

    const rawResults = await Promise.all(
      artists.map(async (artist) => {
        let handles = {};
        try {
          handles = typeof artist.official_handles === 'string' 
            ? JSON.parse(artist.official_handles) 
            : (artist.official_handles || {});
        } catch (e) {
          handles = {};
        }

        let parentHandles = {};
        try {
          parentHandles = typeof artist.parent_official_handles === 'string'
            ? JSON.parse(artist.parent_official_handles)
            : (artist.parent_official_handles || {});
        } catch (e) {
          parentHandles = {};
        }

        // Dynamically resolve Weverse handle & URL from database hierarchy
        const weverseData = handles.weverse || parentHandles.weverse || null;

        // If artist has no official Weverse community, skip — do NOT create fake events
        if (!weverseData || !weverseData.url) {
          return {
            artistId: artist.id,
            artistName: artist.name,
            eventsAdded: 0,
            skipped: true,
          };
        }

        const sourceUrl = weverseData.url;

        if (!sourceUrl || sourceUrl === '#') {
          return {
            artistId: artist.id,
            artistName: artist.name,
            eventsAdded: 0,
          };
        }

        // Live Fetch from Public Weverse Community Endpoint
        const livePosts = await fetchWeversePublicFeed(artist, sourceUrl);
        let addedCount = 0;

        for (const post of livePosts) {
          const inserted = await insertActivityEvent({
            artistId: artist.id,
            platform: 'weverse',
            eventType: post.type || 'POST',
            summaryTitle: post.title,
            thumbnailUrl: artist.avatar_url,
            sourceUrl: post.sourceUrl || sourceUrl,
            publishedAt: post.publishedAt || new Date(),
          });

          if (inserted) addedCount++;
        }

        return {
          artistId: artist.id,
          artistName: artist.name,
          eventsAdded: addedCount,
        };
      })
    );

    const filteredResults = rawResults.filter(Boolean);
    return { success: true, results: filteredResults };
  } catch (error) {
    console.error('Weverse Sync Service Error:', error.message);
    throw error;
  }
}

/**
 * Live Fetch from Public Weverse Community Page / RSS
 * Returns ONLY real data fetched live. Never returns hardcoded/mock catalog arrays.
 */
async function fetchWeversePublicFeed(artist, sourceUrl) {
  try {
    const targetUrl = sourceUrl.includes('/artist') ? sourceUrl : `${sourceUrl.replace(/\/$/, '')}/artist`;
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const posts = [];

    // Parse title or meta tags if available
    const titleMatch = html.match(/<meta [^>]*property="og:title" [^>]*content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);
    const descMatch = html.match(/<meta [^>]*property="og:description" [^>]*content="([^"]+)"/i);

    if (titleMatch && titleMatch[1] && !titleMatch[1].toLowerCase().includes('global fandom platform')) {
      posts.push({
        type: 'POST',
        title: `Weverse Post: ${artist.name} - ${titleMatch[1]}`,
        sourceUrl: targetUrl,
        publishedAt: new Date(),
      });
    } else if (descMatch && descMatch[1] && !descMatch[1].toLowerCase().includes('global fandom platform')) {
      posts.push({
        type: 'POST',
        title: `Weverse Post: ${artist.name} - ${descMatch[1]}`,
        sourceUrl: targetUrl,
        publishedAt: new Date(),
      });
    }

    return posts;
  } catch (err) {
    console.error(`Weverse Live Fetch Error for ${artist.name}:`, err.message);
    return [];
  }
}

/**
 * Helper to safely insert new activity event into database without duplicates
 */
async function insertActivityEvent({ artistId, platform, eventType, summaryTitle, thumbnailUrl, sourceUrl, publishedAt }) {
  try {
    const [existing] = await pool.query(
      'SELECT id FROM activity_events WHERE artist_id = ? AND summary_title = ? AND platform = ?',
      [artistId, summaryTitle, platform]
    );

    if (existing.length > 0) return false;

    const formattedDate = new Date(publishedAt).toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(
      `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [artistId, platform, eventType, summaryTitle, thumbnailUrl, sourceUrl, formattedDate]
    );

    return true;
  } catch (error) {
    console.error('Failed to insert Weverse activity event:', error.message);
    return false;
  }
}
