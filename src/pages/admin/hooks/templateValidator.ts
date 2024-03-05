import { z } from 'zod';

export const templateSchema = z.object({
    productNumber: z.string().min(1, 'Product number is required.'),
    type: z.string().min(1, 'Please select a type.'),
    categoryId: z.string().min(1, 'Please select a category.'),
    revision: z.string().min(1, 'Revision is required.'),
    createdById: z.string(),
    description: z.string().min(1, 'Description is required.'),
});

export type TemplateSchema = z.infer<typeof templateSchema>;
