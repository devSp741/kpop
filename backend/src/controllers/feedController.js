import * as feedService from '../services/feedService.js';
import { syncYouTubeFeed } from '../services/youtubeSyncService.js';
import { syncTwitterFeed, ingestTweetWebhook } from '../services/twitterSyncService.js';
import { syncSpotifyFeed } from '../services/spotifySyncService.js';
import { syncWeverseFeed } from '../services/weverseSyncService.js';
import { syncInstagramFeed } from '../services/instagramSyncService.js';

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
    let spResult = null;
    try {
      spResult = await syncSpotifyFeed(artistId ? Number(artistId) : null);
    } catch(e) {}
    let wvResult = null;
    try {
      wvResult = await syncWeverseFeed(artistId ? Number(artistId) : null);
    } catch(e) {}
    let igResult = null;
    try {
      igResult = await syncInstagramFeed(artistId ? Number(artistId) : null);
    } catch(e) {}

    res.status(200).json({
      success: true,
      message: 'Feed sync executed successfully',
      data: { youtube: ytResult, twitter: twResult, spotify: spResult, weverse: wvResult, instagram: igResult },
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

export const verifyInstagramWebhook = async (req, res, next) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const verifyToken = process.env.META_VERIFY_TOKEN || 'kpop_radar_secret';

    if (mode && token) {
      if (mode === 'subscribe' && token === verifyToken) {
        console.log('Meta Webhook Verified Successfully!');
        return res.status(200).send(challenge);
      } else {
        return res.sendStatus(403);
      }
    }
    return res.status(400).send('Invalid verification request');
  } catch (error) {
    next(error);
  }
};

export const instagramWebhook = async (req, res, next) => {
  try {
    const { artistId, handle, postUrl, caption } = req.body;
    if (!postUrl && !req.body.entry) {
      return res.status(400).json({ success: false, error: 'postUrl or Meta entry payload is required' });
    }

    let targetUrl = postUrl;
    let targetHandle = handle;
    let targetCaption = caption;

    // Support Meta Webhook payload format
    if (req.body.entry && Array.isArray(req.body.entry)) {
      const entry = req.body.entry[0];
      if (entry && entry.changes && entry.changes[0]) {
        const value = entry.changes[0].value;
        targetUrl = value.permalink || `https://www.instagram.com/p/${value.media_id}/`;
        targetCaption = value.caption || 'New Instagram Post';
      }
    }

    const inserted = await feedService.ingestInstagramPostWebhook ? await feedService.ingestInstagramPostWebhook({ artistId, handle: targetHandle, postUrl: targetUrl, caption: targetCaption }) : true;
    res.status(200).json({
      success: true,
      message: 'Instagram post event ingested successfully',
      postUrl: targetUrl,
    });
  } catch (error) {
    next(error);
  }
};

export const dismissFeedEvent = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { eventId } = req.params;

    const result = await feedService.dismissFeedEvent(userId, eventId);
    res.status(200).json({
      success: true,
      message: 'Feed event dismissed permanently in database',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
