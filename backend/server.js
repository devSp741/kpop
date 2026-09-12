import app from './src/app.js';
import dotenv from 'dotenv';
import { syncYouTubeFeed } from './src/services/youtubeSyncService.js';
import { syncTwitterFeed } from './src/services/twitterSyncService.js';
import { syncInstagramFeed } from './src/services/instagramSyncService.js';
import { syncWeverseFeed } from './src/services/weverseSyncService.js';
import { syncSpotifyFeed } from './src/services/spotifySyncService.js';
import { syncTikTokFeed } from './src/services/tiktokSyncService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`KPOP Radar Backend Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

  const syncEnabled = process.env.ENABLE_BACKGROUND_SYNC !== 'false';

  if (!syncEnabled) {
    console.log(`[DEV MODE] Background Social Media Sync is PAUSED via ENABLE_BACKGROUND_SYNC=false in .env. Outbound requests are stopped.`);
  } else {
    console.log(`[SYNC ACTIVE] Background Social Media Sync is ENABLED (ENABLE_BACKGROUND_SYNC=true). Outbound worker active.`);

    // Helper for staggered execution to prevent IP rate-limiting bursts
    const runStaggeredSync = async () => {
      console.log('[SYNC WORKER] Starting scheduled multi-platform feed update...');
      try {
        await syncYouTubeFeed().catch(err => console.error('YouTube sync error:', err.message));
        await new Promise(r => setTimeout(r, 2000));

        await syncInstagramFeed().catch(err => console.error('Instagram sync error:', err.message));
        await new Promise(r => setTimeout(r, 2000));

        await syncWeverseFeed().catch(err => console.error('Weverse sync error:', err.message));
        await new Promise(r => setTimeout(r, 2000));

        await syncTwitterFeed().catch(err => console.error('Twitter sync error:', err.message));
        await new Promise(r => setTimeout(r, 2000));

        await syncSpotifyFeed().catch(err => console.error('Spotify sync error:', err.message));
        await new Promise(r => setTimeout(r, 2000));

        await syncTikTokFeed().catch(err => console.error('TikTok sync error:', err.message));
      } catch (err) {
        console.error('Multi-platform sync error:', err.message);
      }
    };

    // Initial sync on startup (staggered)
    setTimeout(runStaggeredSync, 5000);

    // Background auto-sync worker every 5 minutes (300 seconds) to prevent rate-limiting/blocking
    setInterval(runStaggeredSync, 5 * 60 * 1000);
  }
});
