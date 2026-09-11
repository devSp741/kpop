import app from './src/app.js';
import dotenv from 'dotenv';
import { syncYouTubeFeed } from './src/services/youtubeSyncService.js';
import { syncTwitterFeed } from './src/services/twitterSyncService.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`KPOP Radar Backend Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);

  // Run initial YouTube & Twitter sync on startup & schedule every 10 minutes
  setTimeout(() => {
    syncYouTubeFeed().catch(err => console.error('Initial YouTube sync error:', err.message));
    syncTwitterFeed().catch(err => console.error('Initial Twitter sync error:', err.message));
  }, 3000);

  setInterval(() => {
    syncYouTubeFeed().catch(err => console.error('Background YouTube sync error:', err.message));
    syncTwitterFeed().catch(err => console.error('Background Twitter sync error:', err.message));
  }, 10 * 60 * 1000);
});
