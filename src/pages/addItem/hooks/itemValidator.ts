import { z } from 'zod';

const templateSchema = z.object({
    id: z.string(),
    inputValue: z.string().nullish(),
    category: z.object({
        id: z.string(),
        name: z.string(),
    }),
    type: z.string().min(1, 'type is required'),
    categoryId: z.string().min(1, 'category is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    description: z.string(),
    createdById: z.string(),
    revision: z.string().nullish(),
});

export const itemSchema = z.object({
    itemTemplate: templateSchema,
    itemTemplateId: z.string(),
    wpId: z.array(z.string()),
    serialNumber: z.array(z.string()),
    vendorId: z.string().min(1, 'Vendor is required'),
    comment: z.string().nullish(),
    isBatch: z.boolean(),
    preCheck: z.object({
        check: z.boolean().refine((value) => value, 'Required '),
        comment: z.string(),
    }),
    documentation: z.boolean().refine((value) => value, 'Required'),
    documents: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                blobRef: z.string(),
                contentType: z.string(),
                bytes: z.string(),
            })
        )
        .optional(),
    locationId: z.string().nullish(),
    parentId: z.string().nullish(),
    createdById: z.string().min(1),
    uniqueWpId: z.boolean().refine((data) => data, {}),
    uniqueSerialNumber: z.boolean().refine((data) => data, {}),
    files: z.array(z.instanceof(File)).nullish(),
    numberOfItems: z.string(),
});

export type ItemSchema = z.infer<typeof itemSchema>;
export type TemplateSchema = z.infer<typeof templateSchema>;
