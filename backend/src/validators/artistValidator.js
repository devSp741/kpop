import { z } from 'zod';

export const getArtistsQuerySchema = z.object({
  search: z.string().optional(),
  type: z.enum(['ALL', 'GROUP', 'INDIVIDUAL']).optional().default('ALL'),
  page: z.string().transform(Number).pipe(z.number().positive()).optional().default('1'),
  limit: z.string().transform(Number).pipe(z.number().positive()).optional().default('20'),
});

export const followArtistParamSchema = z.object({
  artistId: z.string().transform(Number).pipe(z.number().positive()),
});
