import { Router } from 'express';
import * as artistController from '../controllers/artistController.js';
import { validate } from '../middlewares/validate.js';
import { getArtistsQuerySchema, followArtistParamSchema } from '../validators/artistValidator.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

// Optional auth to attach user follow status
router.get('/', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticateJWT(req, res, next);
  }
  next();
}, validate(getArtistsQuerySchema, 'query'), artistController.getArtistsList);

router.post('/:artistId/follow', authenticateJWT, validate(followArtistParamSchema, 'params'), artistController.toggleFollow);

export default router;
