import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/db.js';
import { syncSpotifyFeed, getSpotifyAccessToken } from '../services/spotifySyncService.js';

// Load .env variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function runTest() {
  console.log('====================================================');
  console.log('  🎵 K-Pop Radar Spotify Sync Test & Verification  ');
  console.log('====================================================\n');

  try {
    const token = await getSpotifyAccessToken();
    console.log(`[Config Check] Spotify API Credentials Token: ${token ? '✅ Valid Token Generated' : '⚠️ Missing Credentials (Using Free Fallback Mode)'}`);
    console.log(`[Mode] Active Sync Mode: ${token ? 'OFFICIAL SPOTIFY WEB API (Client Credentials)' : 'FREE PUBLIC METADATA / OEMBED FALLBACK'}\n`);

    console.log('[Syncing] Executing Spotify feed sync for all active K-Pop artists...');
    const startTime = Date.now();
    const result = await syncSpotifyFeed();
    const duration = Date.now() - startTime;

    console.log(`\n[Sync Completed in ${duration}ms] Summary:`);
    console.table(result.results);

    // Verify DB entries created
    console.log('\n[Database Verification] Querying latest Spotify entries from activity_events table...');
    const [events] = await pool.query(
      `SELECT ae.id, a.name AS artist_name, ae.platform, ae.event_type, ae.summary_title, ae.source_url, ae.published_at 
       FROM activity_events ae
       JOIN artists a ON ae.artist_id = a.id
       WHERE ae.platform = 'spotify'
       ORDER BY ae.published_at DESC
       LIMIT 10`
    );

    console.log(`\nFound ${events.length} Spotify event records in database:`);
    if (events.length > 0) {
      console.table(events.map(e => ({
        ID: e.id,
        Artist: e.artist_name,
        Platform: e.platform,
        Type: e.event_type,
        Title: e.summary_title.length > 45 ? e.summary_title.substring(0, 42) + '...' : e.summary_title,
        PublishedAt: new Date(e.published_at).toISOString().split('T')[0],
      })));
    } else {
      console.log('No Spotify events found yet.');
    }

    console.log('\n====================================================');
    console.log('  ✅ Spotify Sync Test Completed Successfully!  ');
    console.log('====================================================');
  } catch (error) {
    console.error('\n❌ Test Error:', error);
  } finally {
    process.exit(0);
  }
}

runTest();
