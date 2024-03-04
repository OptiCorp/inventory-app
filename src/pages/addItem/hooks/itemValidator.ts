import { z } from 'zod';

const templateSchema = z.object({
    id: z.string(),
    inputValue: z.string().nullish(),
    category: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullish(),
    type: z.string().min(1, 'Type is required'),
    categoryId: z.string().min(1, 'Category is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    description: z.string().min(1, 'Description is required'),
    createdById: z.string(),
    revision: z.string().min(1, 'Revision is required'),
});

export const itemSchema = z.object({
    itemTemplate: templateSchema,
    itemTemplateId: z.string(),
    wpId: z
        .array(z.string().min(1, 'WpId is required'))
        .min(1)
        .refine(
            (data) => {
                return new Set(data).size === data.length;
            },
            {
                message: 'All ids must be unique',
            }
        ),
    serialNumber: z
        .array(z.string().min(1, 'Serial number is required'))
        .min(1)
        .refine(
            (data) => {
                return new Set(data).size === data.length;
            },
            {
                message: 'All ids must be unique',
            }
        ),
    vendorId: z.string().min(1, 'Vendor is required'),
    comment: z.string().nullish(),
    isBatch: z.boolean(),
    preCheck: z.object({
        check: z.boolean().refine((value) => value, 'Required '),
        comment: z.string(),
    }),
    documentation: z.boolean().refine((value) => value, 'Required'),
    locationId: z.string().min(1, 'Location is required'),
    parentId: z.string().nullish(),
    createdById: z.string().min(1),
    uniqueWpId: z.boolean().refine((data) => data, {}),
    uniqueSerialNumber: z.boolean().refine((data) => data, {}),
    files: z.array(z.instanceof(File)).nullish(),
    documentTypes: z.array(z.string().nullish()),
    uploadToTemplate: z.array(z.boolean().nullish()),
    numberOfItems: z.number().min(1, 'minimum one item').max(200, 'max 200 items'),
});

export type ItemSchema = z.infer<typeof itemSchema>;
export type TemplateSchema = z.infer<typeof templateSchema>;
