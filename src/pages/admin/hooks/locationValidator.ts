import { z } from 'zod';

export const locationSchema = z.object({
    name: z.string().min(1, 'Location name is required'),
    createdById: z.string().min(1),
});

export type LocationSchema = z.infer<typeof locationSchema>;
