import { z } from 'zod';

export const templateSchema = z.object({
    productNumber: z.string(),
    type: z.string(),
    categoryId: z.string(),
    revision: z.string(),
    createdById: z.string(),
    description: z.string(),
});

export type TemplateSchema = z.infer<typeof templateSchema>;
