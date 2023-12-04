import { z } from 'zod'

export const partSchema = z.object({
    wpId: z.string().min(1, 'id is required'),
    description: z.string().min(1, 'Description is required'),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    vendor: z.string().min(1, 'Vendor is required'),
    type: z.union([
        z.literal('unit'),
        z.literal('assembly'),
        z.literal('sub-assembly'),
        z.literal('part'),
    ]),
    comment: z.string().nullish(),
    location: z.string().nullish(),
    parentId: z.string().nullish(),
    addedById: z.string().min(1),
})

export type PartSchema = z.infer<typeof partSchema>
