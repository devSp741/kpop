import pool from '../config/db.js';

/**
 * Spotify Sync Service for K-Pop Radar
 * 
 * Supports:
 * 1. Spotify Web API Client Credentials Flow (when SPOTIFY_CLIENT_ID & SPOTIFY_CLIENT_SECRET are in backend/.env)
 * 2. Public Fallback Mode (when API keys are missing, extracts metadata cleanly via Spotify public embed/OEmbed)
 */

let cachedAccessToken = null;
let tokenExpiresAt = 0;

/**
 * Get Spotify Access Token using Client Credentials Flow
 */
export async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret || clientId === 'your_spotify_client_id_here') {
    return null; // Return null to trigger public fallback mode
  }

  // Use cached token if valid
  if (cachedAccessToken && Date.now() < tokenExpiresAt - 60000) {
    return cachedAccessToken;
  }

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      console.warn(`Spotify Auth Warning: Status ${response.status}`);
      return null;
    }

    const data = await response.json();
    if (data.access_token) {
      cachedAccessToken = data.access_token;
      tokenExpiresAt = Date.now() + (data.expires_in * 1000);
      return cachedAccessToken;
    }
    return null;
  } catch (error) {
    console.error('Spotify Auth Error:', error.message);
    return null;
  }
}

/**
 * Sync Spotify activity events (new music releases & albums) for active artists
 * @param {number|null} artistId - Optional artist ID. If null, syncs for all active artists.
 */
export async function syncSpotifyFeed(artistId = null) {
  try {
    if (process.env.ENABLE_BACKGROUND_SYNC === 'false') {
      return { success: true, count: 0, paused: true, message: 'Spotify sync paused via ENABLE_BACKGROUND_SYNC=false' };
    }

    let query = `SELECT id, name, slug, official_handles FROM artists WHERE is_active = 1`;
    const queryParams = [];

    if (artistId) {
      query += ` AND id = ?`;
      queryParams.push(artistId);
    }

    const [artists] = await pool.query(query, queryParams);
    const token = await getSpotifyAccessToken();

    const rawResults = [];
    for (const artist of artists) {
      let handles = {};
      try {
        handles = typeof artist.official_handles === 'string' 
          ? JSON.parse(artist.official_handles) 
          : (artist.official_handles || {});
      } catch (e) {
        handles = {};
      }

      const spotifyData = handles.spotify;
      if (!spotifyData) continue;

      const spotifyUrl = spotifyData.url || '';
      let spotifyId = null;

      const match = spotifyUrl.match(/\/artist\/([a-zA-Z0-9]+)/);
      if (match) {
        spotifyId = match[1];
      }

      let newEventsCount = 0;

      if (token) {
        newEventsCount = await fetchViaSpotifyApi(artist.id, artist.name, spotifyId, token, spotifyUrl);
      } else {
        newEventsCount = await fetchViaSpotifyFallback(artist.id, artist.name, spotifyUrl, spotifyId);
      }

      rawResults.push({
        artistId: artist.id,
        artistName: artist.name,
        spotifyId: spotifyId || 'N/A',
        eventsAdded: newEventsCount,
        mode: token ? 'API' : 'FALLBACK',
      });

      // 500ms delay between Spotify fetches
      await new Promise(r => setTimeout(r, 500));
    }

    return { success: true, results: rawResults };
  } catch (error) {
    console.error('Spotify Sync Service Error:', error.message);
    throw error;
  }
}

/**
 * Fetch latest artist releases via Official Spotify Web API
 */
async function fetchViaSpotifyApi(artistId, artistName, spotifyId, token, spotifyUrl) {
  try {
    let targetId = spotifyId;

    // 1. If spotifyId is missing or invalid, search for artist by name
    if (!targetId || targetId.length !== 22) {
      const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`;
      const searchRes = await fetch(searchUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        if (searchData.artists?.items?.[0]?.id) {
          targetId = searchData.artists.items[0].id;
        }
      }
    }

    if (targetId) {
      // 2. Fetch artist profile details to update follower count
      const profileUrl = `https://api.spotify.com/v1/artists/${targetId}`;
      const profileRes = await fetch(profileUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        if (profileData.followers && profileData.followers.total) {
          const formattedFollowers = formatFollowerCount(profileData.followers.total);
          await pool.query('UPDATE artists SET follower_count = ? WHERE id = ?', [formattedFollowers, artistId]);
        }
      }

      // 3. Fetch artist's latest albums and singles
      const releasesUrl = `https://api.spotify.com/v1/artists/${targetId}/albums?include_groups=album,single&limit=5&market=US`;
      const response = await fetch(releasesUrl, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          let addedCount = 0;
          for (const album of data.items) {
            const title = album.name;
            const releaseType = album.album_type ? album.album_type.toUpperCase() : 'SINGLE';
            const thumbnailUrl = album.images && album.images[0] ? album.images[0].url : null;
            const sourceUrl = album.external_urls ? album.external_urls.spotify : `https://open.spotify.com/artist/${targetId}`;
            const publishedAt = album.release_date ? parseSpotifyDate(album.release_date) : new Date();

            const inserted = await insertActivityEvent({
              artistId,
              platform: 'spotify',
              eventType: 'MUSIC_RELEASE',
              summaryTitle: `Spotify Release: ${title} (${releaseType})`,
              thumbnailUrl,
              sourceUrl,
              publishedAt,
            });

            if (inserted) addedCount++;
          }
          if (addedCount > 0) return addedCount;
        }
      }
    }

    // Fallback to OEmbed/Public metadata if API endpoints are restricted
    return await fetchViaSpotifyFallback(artistId, artistName, spotifyUrl, targetId);
  } catch (err) {
    console.error(`Error fetching Spotify API for ${artistName}:`, err.message);
    return await fetchViaSpotifyFallback(artistId, artistName, spotifyUrl, spotifyId);
  }
}

/**
 * Public Fallback Mode: Fetch Spotify metadata directly using artist handle and official URL
 */
async function fetchViaSpotifyFallback(artistId, artistName, spotifyUrl, spotifyId) {
  try {
    const [artistRows] = await pool.query('SELECT slug, avatar_url FROM artists WHERE id = ?', [artistId]);
    if (artistRows.length === 0) return 0;
    const avatarUrl = artistRows[0].avatar_url;
    const sourceUrl = spotifyUrl || `https://open.spotify.com/artist/${spotifyId || ''}`;

    const inserted = await insertActivityEvent({
      artistId,
      platform: 'spotify',
      eventType: 'MUSIC_RELEASE',
      summaryTitle: `${artistName} Official Spotify Releases & Top Songs`,
      thumbnailUrl: avatarUrl,
      sourceUrl,
      publishedAt: new Date(),
    });

    return inserted ? 1 : 0;
  } catch (err) {
    console.error(`Error in Spotify Fallback for ${artistName}:`, err.message);
    return 0;
  }
}

/**
 * Helper to safely insert new activity event into database without duplicates
 */
async function insertActivityEvent({ artistId, platform, eventType, summaryTitle, thumbnailUrl, sourceUrl, publishedAt }) {
  try {
    const [existing] = await pool.query(
      'SELECT id FROM activity_events WHERE artist_id = ? AND source_url = ?',
      [artistId, sourceUrl]
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
    console.error('Insert Spotify Activity Event Error:', error.message);
    return false;
  }
}

/**
 * Format Spotify total followers number to human readable string (e.g. 75.4M, 850K)
 */
function formatFollowerCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Parse Spotify YYYY or YYYY-MM or YYYY-MM-DD date strings safely
 */
function parseSpotifyDate(dateStr) {
  if (!dateStr) return new Date();
  if (dateStr.length === 4) return new Date(`${dateStr}-01-01`);
  if (dateStr.length === 7) return new Date(`${dateStr}-01`);
  return new Date(dateStr);
}
