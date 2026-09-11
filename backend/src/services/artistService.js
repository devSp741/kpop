import pool from '../config/db.js';

export const getArtists = async ({ search, type, userId, limit, offset }) => {
  let whereClause = `WHERE a.is_active = 1`;
  const whereParams = [];

  if (type && type !== 'ALL') {
    whereClause += ` AND a.type = ?`;
    whereParams.push(type);
  }

  if (search) {
    whereClause += ` AND (a.name LIKE ? OR a.group_name LIKE ? OR a.slug LIKE ?)`;
    const searchPattern = `%${search}%`;
    whereParams.push(searchPattern, searchPattern, searchPattern);
  }

  // Count total matching artists
  const countQuery = `SELECT COUNT(*) AS total FROM artists a ${whereClause}`;
  const [[{ total }]] = await pool.query(countQuery, whereParams);

  // Main data query
  let query = `
    SELECT 
      a.id, 
      a.slug, 
      a.name, 
      a.type, 
      a.parent_artist_id as parentArtistId, 
      a.group_name as groupName, 
      a.avatar_url as avatar, 
      a.follower_count as followerCount, 
      a.official_handles as officialHandles,
      ${userId ? `IF(uf.user_id IS NOT NULL, true, false)` : 'false'} AS isFollowed
    FROM artists a
    ${userId ? `LEFT JOIN user_follows uf ON a.id = uf.artist_id AND uf.user_id = ?` : ''}
    ${whereClause}
    ORDER BY a.id ASC
  `;

  const queryParams = userId ? [userId, ...whereParams] : [...whereParams];

  // Pagination parameters
  const parsedLimit = limit ? Number(limit) : null;
  const parsedOffset = offset ? Number(offset) : 0;

  if (parsedLimit) {
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(parsedLimit, parsedOffset);
  }

  const [rows] = await pool.query(query, queryParams);

  const formattedRows = rows.map(artist => ({
    ...artist,
    isFollowed: Boolean(artist.isFollowed),
    officialHandles: typeof artist.officialHandles === 'string' 
      ? JSON.parse(artist.officialHandles) 
      : artist.officialHandles
  }));

  return {
    rows: formattedRows,
    total,
    limit: parsedLimit,
    offset: parsedOffset,
    hasMore: parsedLimit ? (parsedOffset + formattedRows.length) < total : false,
  };
};

export const toggleFollowArtist = async (userId, artistId) => {
  const [existing] = await pool.query(
    'SELECT * FROM user_follows WHERE user_id = ? AND artist_id = ?',
    [userId, artistId]
  );

  if (existing.length > 0) {
    await pool.query('DELETE FROM user_follows WHERE user_id = ? AND artist_id = ?', [userId, artistId]);
    return { artistId, isFollowed: false };
  } else {
    await pool.query('INSERT INTO user_follows (user_id, artist_id) VALUES (?, ?)', [userId, artistId]);
    return { artistId, isFollowed: true };
  }
};
