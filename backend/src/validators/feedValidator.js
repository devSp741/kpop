import { z } from 'zod';

export const getFeedQuerySchema = z.object({
  platform: z.enum(['all', 'youtube', 'instagram', 'tiktok', 'spotify', 'weverse', 'twitter', 'facebook']).optional().default('all'),
  artistId: z.string().transform(Number).pipe(z.number().positive()).optional(),
  followedOnly: z.enum(['true', 'false']).optional().default('false'),
  page: z.string().transform(Number).pipe(z.number().positive()).optional().default('1'),
  limit: z.string().transform(Number).pipe(z.number().positive()).optional().default('20'),
});
