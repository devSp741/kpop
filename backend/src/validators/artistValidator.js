import { z } from 'zod';

export const getArtistsQuerySchema = z.object({
  search: z.string().optional(),
  type: z.enum(['ALL', 'GROUP', 'INDIVIDUAL']).optional().default('ALL'),
  page: z.string().optional(),
  limit: z.string().optional(),
  offset: z.string().optional(),
});


export const followArtistParamSchema = z.object({
  artistId: z.string().transform(Number).pipe(z.number().positive()),
});
