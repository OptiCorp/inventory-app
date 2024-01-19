import { z } from 'zod';

export const partSchema = z.object({
    wpId: z.string().min(1, 'WellPartner ID is required'),
    categoryId: z.string().min(1, 'Category is required'),
    description: z.string().min(1, 'Description is required'),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    vendorId: z.string().min(1, 'Vendor is required'),
    type: z.string().min(1, 'Type is required'),
    comment: z.string().nullish(),
    locationId: z.string().nullish(),
    parentId: z.string().nullish(),
    addedById: z.string().min(1),
    uniqueWpId: z.boolean().refine((data) => data, {}),
    files: z.array(z.instanceof(File)).nullish(),
});

export type PartSchema = z.infer<typeof partSchema>;
