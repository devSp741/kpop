import pool from '../config/db.js';

export const getArtists = async ({ search, type, userId }) => {
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
    WHERE a.is_active = 1
  `;

  const queryParams = userId ? [userId] : [];

  if (type && type !== 'ALL') {
    query += ` AND a.type = ?`;
    queryParams.push(type);
  }

  if (search) {
    query += ` AND (a.name LIKE ? OR a.group_name LIKE ? OR a.slug LIKE ?)`;
    const searchPattern = `%${search}%`;
    queryParams.push(searchPattern, searchPattern, searchPattern);
  }

  query += ` ORDER BY a.id ASC`;

  const [rows] = await pool.query(query, queryParams);

  return rows.map(artist => ({
    ...artist,
    isFollowed: Boolean(artist.isFollowed),
    officialHandles: typeof artist.officialHandles === 'string' 
      ? JSON.parse(artist.officialHandles) 
      : artist.officialHandles
  }));
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
