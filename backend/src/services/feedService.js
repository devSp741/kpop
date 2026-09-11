import pool from '../config/db.js';

export const getActivityFeed = async ({ platform, artistId, userId, followedOnly, page = 1, limit = 20 }) => {
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      e.id, 
      e.artist_id as artistId, 
      a.slug as artistSlug, 
      a.name as artistName, 
      a.group_name as groupName, 
      a.avatar_url as artistAvatar, 
      e.platform, 
      e.event_type as eventType, 
      e.summary_title as summaryTitle, 
      e.thumbnail_url as thumbnailUrl, 
      e.source_url as sourceUrl, 
      e.published_at as publishedAt
    FROM activity_events e
    JOIN artists a ON e.artist_id = a.id
  `;

  const queryParams = [];
  const whereClauses = [];

  if (platform && platform !== 'all') {
    whereClauses.push('e.platform = ?');
    queryParams.push(platform);
  }

  if (artistId) {
    whereClauses.push('e.artist_id = ?');
    queryParams.push(Number(artistId));
  }

  if (followedOnly === 'true' && userId) {
    whereClauses.push(`e.artist_id IN (
      SELECT artist_id FROM user_follows WHERE user_id = ?
      UNION
      SELECT id FROM artists WHERE parent_artist_id IN (SELECT artist_id FROM user_follows WHERE user_id = ?)
      UNION
      SELECT parent_artist_id FROM artists WHERE id IN (SELECT artist_id FROM user_follows WHERE user_id = ?) AND parent_artist_id IS NOT NULL
    )`);
    queryParams.push(userId, userId, userId);
  }

  // Filter out any events the user has dismissed/swiped away
  if (userId) {
    whereClauses.push('e.id NOT IN (SELECT event_id FROM user_dismissed_events WHERE user_id = ?)');
    queryParams.push(userId);
  }

  if (whereClauses.length > 0) {
    query += ` WHERE ` + whereClauses.join(' AND ');
  }

  query += ` ORDER BY e.published_at DESC LIMIT ? OFFSET ?`;
  queryParams.push(Number(limit), Number(offset));

  const [rows] = await pool.query(query, queryParams);
  return rows;
};

/**
 * Persistently dismiss a feed event for a user in database
 */
export const dismissFeedEvent = async (userId, eventId) => {
  await pool.query(
    'INSERT IGNORE INTO user_dismissed_events (user_id, event_id) VALUES (?, ?)',
    [userId, Number(eventId)]
  );
  return { userId, eventId: Number(eventId), dismissed: true };
};
