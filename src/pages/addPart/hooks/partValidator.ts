import { z } from 'zod';

const templateSchema = z.object({
    id: z.string(),
    name: z.string(),
    inputValue: z.string().nullish(),
    type: z.string(),

    category: z.object({
        id: z.string(),
        name: z.string(),
        updatedDate: z.string(),
        createdDate: z.string(),
        createdById: z.string(),
    }),
    categoryId: z.string(),
    productNumber: z.string(),
    description: z.string().optional(),
});

export const partSchema = z.object({
    templateData: templateSchema.nullish(),
    itemTemplateId: z.string(),
    wpId: z.string().min(1, 'WellPartner ID is required'),
    categoryId: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    vendorId: z.string().min(1, 'Vendor is required'),
    type: z.string().min(1, 'Type is required'),
    comment: z.string().nullish(),
    isBatch: z.boolean(),
    preCheck: z.object({
        check: z.boolean().refine((value) => value),
        comment: z.string(),
    }),
    documentation: z.boolean().refine((value) => value),
    documents: z
        .object({
            id: z.string(),
            name: z.string(),
            blobRef: z.string(),
            contentType: z.string(),
            bytes: z.string(),
        })
        .optional(),
    locationId: z.string().nullish(),
    parentId: z.string().nullish(),
    createdById: z.string().min(1),
    uniqueWpId: z.boolean().refine((data) => data, {}),
    files: z.array(z.instanceof(File)).nullish(),
});

export type PartSchema = z.infer<typeof partSchema>;
export type TemplateSchema = z.infer<typeof templateSchema>;
