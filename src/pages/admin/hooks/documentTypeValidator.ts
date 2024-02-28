import { z } from 'zod';

export const documentTypeSchema = z.object({
    name: z.string().min(1, 'Category name is required'),
    description: z.string().min(1, 'Description is required'),
});

export type DocumentTypeSchema = z.infer<typeof documentTypeSchema>;
