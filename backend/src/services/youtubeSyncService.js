import pool from '../config/db.js';

/**
 * Clean & Free YouTube Real-Time Sync Service
 * 
 * Supports:
 * 1. YouTube Data API v3 (when YOUTUBE_API_KEY is configured in backend/.env)
 * 2. Public YouTube RSS XML Feed (100% Free Fallback without requiring API Key)
 */

/**
 * Sync YouTube activity events for a specific artist or all artists with YouTube handles
 * @param {number|null} artistId - Optional artist ID. If null, syncs for all active artists.
 */
export async function syncYouTubeFeed(artistId = null) {
  try {
    let query = `SELECT id, name, slug, official_handles FROM artists WHERE is_active = 1`;
    const queryParams = [];

    if (artistId) {
      query += ` AND id = ?`;
      queryParams.push(artistId);
    }

    const [artists] = await pool.query(query, queryParams);
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

      const youtubeData = handles.youtube;
      if (!youtubeData || !youtubeData.handle) continue;

      const handleName = youtubeData.handle; // e.g. '@SATYAMPRAJAPATI' or '@BTS'
      const channelUrl = youtubeData.url || `https://www.youtube.com/${handleName}`;

      const apiKey = process.env.YOUTUBE_API_KEY;
      let newEventsCount = 0;

      if (apiKey && apiKey !== 'your_youtube_api_key_here') {
        newEventsCount = await fetchViaYouTubeApi(artist.id, artist.name, handleName, apiKey);
      } else {
        newEventsCount = await fetchViaYouTubeRss(artist.id, artist.name, handleName, channelUrl);
      }

      syncResults.push({
        artistId: artist.id,
        artistName: artist.name,
        handle: handleName,
        eventsAdded: newEventsCount,
      });
    }

    return { success: true, results: syncResults };
  } catch (error) {
    console.error('YouTube Sync Service Error:', error.message);
    throw error;
  }
}

/**
 * Fetch latest videos via Official YouTube Data API v3 (Free 10,000 units/day)
 */
async function fetchViaYouTubeApi(artistId, artistName, handleName, apiKey) {
  try {
    const queryTerm = handleName.replace('@', '');
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=date&q=${encodeURIComponent(queryTerm)}&type=video&key=${apiKey}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`YouTube API warning for ${handleName}: Status ${response.status}`);
      return 0;
    }

    const data = await response.json();
    if (!data.items || !Array.isArray(data.items)) return 0;

    let addedCount = 0;
    for (const item of data.items) {
      const videoId = item.id?.videoId;
      if (!videoId) continue;

      const title = item.snippet?.title || `New Video from ${artistName}`;
      const thumbnailUrl = item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url;
      const sourceUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const publishedAt = item.snippet?.publishedAt ? new Date(item.snippet.publishedAt) : new Date();

      const inserted = await insertActivityEvent({
        artistId,
        platform: 'youtube',
        eventType: 'MV',
        summaryTitle: `YouTube Upload: ${title}`,
        thumbnailUrl,
        sourceUrl,
        publishedAt,
      });

      if (inserted) addedCount++;
    }

    return addedCount;
  } catch (err) {
    console.error(`Error fetching YouTube API for ${handleName}:`, err.message);
    return 0;
  }
}

/**
 * Fetch latest YouTube videos via 100% Free Public RSS Feed (No API Key Required)
 */
async function fetchViaYouTubeRss(artistId, artistName, handleName, channelUrl) {
  try {
    // Attempt channel HTML scrape for Channel ID to access public RSS XML
    const response = await fetch(channelUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    });

    if (!response.ok) return 0;
    const html = await response.text();

    // Match YouTube Channel ID from page metadata
    const channelIdMatch = 
      html.match(/"externalId":"(UC[a-zA-Z0-9_-]{22})"/) ||
      html.match(/"channelId":"(UC[a-zA-Z0-9_-]{22})"/) ||
      html.match(/\/channel\/(UC[a-zA-Z0-9_-]{22})/);

    if (!channelIdMatch) {
      console.warn(`Could not extract channelId for ${handleName}`);
      return 0;
    }

    const channelId = channelIdMatch[1];
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const rssResponse = await fetch(rssUrl);
    if (!rssResponse.ok) return 0;
    const xmlText = await rssResponse.text();

    // Simple regex parser for RSS <entry> items
    const entries = xmlText.split('<entry>').slice(1);
    let addedCount = 0;

    for (const entry of entries.slice(0, 5)) {
      const titleMatch = entry.match(/<title>(.*?)<\/title>/);
      const linkMatch = entry.match(/<link rel="alternate" href="(.*?)"/);
      const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
      const mediaThumbMatch = entry.match(/<media:thumbnail url="(.*?)"/);

      if (!linkMatch || !titleMatch) continue;

      let title = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
      // Decode common XML/HTML entities
      title = title
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

      const sourceUrl = linkMatch[1];
      const thumbnailUrl = mediaThumbMatch ? mediaThumbMatch[1] : null;
      const publishedAt = publishedMatch ? new Date(publishedMatch[1]) : new Date();

      const inserted = await insertActivityEvent({
        artistId,
        platform: 'youtube',
        eventType: 'MV',
        summaryTitle: `YouTube Upload: ${title}`,
        thumbnailUrl,
        sourceUrl,
        publishedAt,
      });

      if (inserted) addedCount++;
    }

    return addedCount;
  } catch (err) {
    console.error(`Error fetching YouTube RSS for ${handleName}:`, err.message);
    return 0;
  }
}

/**
 * Helper to safely insert new activity event into database without duplicates
 */
async function insertActivityEvent({ artistId, platform, eventType, summaryTitle, thumbnailUrl, sourceUrl, publishedAt }) {
  try {
    // Check if source_url or summary_title already exists for this artist
    const [existing] = await pool.query(
      'SELECT id FROM activity_events WHERE artist_id = ? AND source_url = ?',
      [artistId, sourceUrl]
    );

    if (existing.length > 0) return false; // Duplicate event, skip

    // Format JS Date to MySQL DATETIME (YYYY-MM-DD HH:MM:SS)
    const formattedDate = new Date(publishedAt).toISOString().slice(0, 19).replace('T', ' ');

    await pool.query(
      `INSERT INTO activity_events (artist_id, platform, event_type, summary_title, thumbnail_url, source_url, published_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [artistId, platform, eventType, summaryTitle, thumbnailUrl, sourceUrl, formattedDate]
    );

    return true;
  } catch (error) {
    console.error('Insert Activity Event Error:', error.message);
    return false;
  }
}
