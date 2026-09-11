import { Router } from 'express';
import * as feedController from '../controllers/feedController.js';
import { validate } from '../middlewares/validate.js';
import { getFeedQuerySchema } from '../validators/feedValidator.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js';

const router = Router();

// Optional JWT authentication to support followed-only timeline feed
router.get('/', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authenticateJWT(req, res, next);
  }
  next();
}, validate(getFeedQuerySchema, 'query'), feedController.getFeed);

router.post('/sync', feedController.syncFeed);
router.post('/webhook/twitter', feedController.twitterWebhook);

export default router;
