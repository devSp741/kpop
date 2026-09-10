import * as artistService from '../services/artistService.js';

export const getArtistsList = async (req, res, next) => {
  try {
    const userId = req.user?.userId || null;
    const artists = await artistService.getArtists({
      search: req.query.search,
      type: req.query.type,
      userId,
    });

    res.status(200).json({
      success: true,
      data: artists,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleFollow = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { artistId } = req.params;

    const result = await artistService.toggleFollowArtist(userId, Number(artistId));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
