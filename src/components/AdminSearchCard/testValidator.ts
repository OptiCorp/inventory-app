import { z } from 'zod';

export const testSchema = z.object({
    name: z.string().min(1, 'name is required'),
    description: z.string(),
});

export type TestSchema = z.infer<typeof testSchema>;
