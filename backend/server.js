import app from './src/app.js';
import dotenv from 'dotenv';
import { syncYouTubeFeed } from './src/services/youtubeSyncService.js';
import { syncTwitterFeed } from './src/services/twitterSyncService.js';
import { syncInstagramFeed } from './src/services/instagramSyncService.js';
import { syncWeverseFeed } from './src/services/weverseSyncService.js';

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

    // Initial sync on startup
    setTimeout(() => {
      syncInstagramFeed().catch(err => console.error('Initial Instagram sync error:', err.message));
      syncYouTubeFeed().catch(err => console.error('Initial YouTube sync error:', err.message));
      syncWeverseFeed().catch(err => console.error('Initial Weverse sync error:', err.message));
      syncTwitterFeed().catch(err => console.error('Initial Twitter sync error:', err.message));
    }, 3000);

    // Background auto-sync worker every 30 seconds
    setInterval(() => {
      syncInstagramFeed().catch(err => console.error('Background Instagram sync error:', err.message));
      syncWeverseFeed().catch(err => console.error('Background Weverse sync error:', err.message));
      syncYouTubeFeed().catch(err => console.error('Background YouTube sync error:', err.message));
      syncTwitterFeed().catch(err => console.error('Background Twitter sync error:', err.message));
    }, 30 * 1000);
  }
});
