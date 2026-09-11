import * as artistService from '../services/artistService.js';
import { syncYouTubeFeed } from '../services/youtubeSyncService.js';

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
    const { artistId } = req.params;

    const result = await artistService.toggleFollowArtist(userId, Number(artistId));

    // Trigger instant background sync for newly followed idol
    if (result.isFollowed) {
      syncYouTubeFeed(Number(artistId)).catch(err => console.error('Instant follow sync error:', err.message));
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
