import pool from '../config/db.js';

export const getActivityFeed = async ({ platform, artistId, userId, followedOnly, page = 1, limit = 40, offset: customOffset }) => {
  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(50, Math.max(1, Number(limit) || 40));
  const offset = customOffset !== undefined && customOffset !== null ? Number(customOffset) : (pageNum - 1) * limitNum;

  // Maximum allowed scroll threshold managed directly by Database API engine
  const MAX_ALLOWED_ITEMS = 100;

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

  const whereSql = whereClauses.length > 0 ? ` WHERE ${whereClauses.join(' AND ')}` : '';

  // Get total count from DB
  const countQuery = `
    SELECT COUNT(*) as total
    FROM activity_events e
    JOIN artists a ON e.artist_id = a.id
    ${whereSql}
  `;
  const [countRows] = await pool.query(countQuery, queryParams);
  const rawTotal = countRows[0]?.total || 0;
  const total = Math.min(rawTotal, MAX_ALLOWED_ITEMS);

  if (offset >= total) {
    return {
      events: [],
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
        hasMore: false,
      },
    };
  }

  const effectiveLimit = Math.min(limitNum, MAX_ALLOWED_ITEMS - offset);

  const query = `
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
    ${whereSql}
    ORDER BY e.published_at DESC
    LIMIT ? OFFSET ?
  `;
  const dataQueryParams = [...queryParams, effectiveLimit, offset];

  const [rows] = await pool.query(query, dataQueryParams);
  const hasMore = offset + rows.length < total;

  return {
    events: rows,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
      hasMore,
    },
  };
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
