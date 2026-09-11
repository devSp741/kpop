import * as artistService from '../services/artistService.js';
import { syncYouTubeFeed } from '../services/youtubeSyncService.js';
import { syncSpotifyFeed } from '../services/spotifySyncService.js';
import { syncTwitterFeed } from '../services/twitterSyncService.js';
import { syncWeverseFeed } from '../services/weverseSyncService.js';
import pool from '../config/db.js';

export const getArtistsList = async (req, res, next) => {
  try {
    const userId = req.user?.userId || null;
    const result = await artistService.getArtists({
      search: req.query.search,
      type: req.query.type,
      limit: req.query.limit,
      offset: req.query.offset,
      userId,
    });

    res.status(200).json({
      success: true,
      data: result.rows,
      pagination: {
        total: result.total,
        limit: result.limit,
        offset: result.offset,
        hasMore: result.hasMore,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFollow = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const numArtistId = Number(req.params.artistId);

    const result = await artistService.toggleFollowArtist(userId, numArtistId);

    // When artist is followed, execute instant real-time sync across all platforms
    if (result.isFollowed) {
      try {
        await Promise.allSettled([
          syncYouTubeFeed(numArtistId),
          syncSpotifyFeed(numArtistId),
          syncTwitterFeed(numArtistId),
          syncWeverseFeed(numArtistId),
        ]);

        // Fetch the latest synced notification/event for this artist
        const [latestEvents] = await pool.query(
          `SELECT e.id, e.artist_id as artistId, a.name as artistName, a.avatar_url as artistAvatar, 
                  e.platform, e.event_type as eventType, e.summary_title as summaryTitle, 
                  e.thumbnail_url as thumbnailUrl, e.source_url as sourceUrl, e.published_at as publishedAt
           FROM activity_events e
           JOIN artists a ON e.artist_id = a.id
           WHERE e.artist_id = ?
           ORDER BY e.published_at DESC LIMIT 1`,
          [numArtistId]
        );

        if (latestEvents.length > 0) {
          result.latestNotification = latestEvents[0];
        }
      } catch (syncErr) {
        console.error('Instant follow sync error:', syncErr.message);
      }
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
