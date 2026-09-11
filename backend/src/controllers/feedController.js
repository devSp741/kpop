import * as feedService from '../services/feedService.js';
import { syncYouTubeFeed } from '../services/youtubeSyncService.js';
import { syncTwitterFeed, ingestTweetWebhook } from '../services/twitterSyncService.js';

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

export const syncFeed = async (req, res, next) => {
  try {
    const artistId = req.query.artistId || req.body.artistId || null;
    const ytResult = await syncYouTubeFeed(artistId ? Number(artistId) : null);
    let twResult = null;
    try {
      twResult = await syncTwitterFeed(artistId ? Number(artistId) : null);
    } catch(e) {}

    res.status(200).json({
      success: true,
      message: 'Feed sync executed successfully',
      data: { youtube: ytResult, twitter: twResult },
    });
  } catch (error) {
    next(error);
  }
};

export const twitterWebhook = async (req, res, next) => {
  try {
    const { handle, text, sourceUrl, publishedAt } = req.body;
    if (!handle || !text) {
      return res.status(400).json({ success: false, error: 'handle and text are required fields' });
    }

    const inserted = await ingestTweetWebhook({ handle, text, sourceUrl, publishedAt });
    res.status(200).json({
      success: true,
      message: inserted ? 'Tweet ingested successfully' : 'Duplicate tweet ignored',
      inserted,
    });
  } catch (error) {
    next(error);
  }
};
