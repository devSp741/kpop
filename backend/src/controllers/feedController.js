import * as feedService from '../services/feedService.js';

export const getFeed = async (req, res, next) => {
  try {
    const userId = req.user?.userId || null;
    const feedEvents = await feedService.getActivityFeed({
      platform: req.query.platform,
      artistId: req.query.artistId,
      followedOnly: req.query.followedOnly,
      page: req.query.page,
      limit: req.query.limit,
      userId,
    });

    res.status(200).json({
      success: true,
      data: feedEvents,
    });
  } catch (error) {
    next(error);
  }
};
