import { z } from 'zod';
import { categorySchema } from './categoryValidator';

export const vendorSchema = z.object({
    name: z.string().min(1, 'Vendor name is required'),
    addedById: z.string().min(1),
});

export type VendorSchema = z.infer<typeof categorySchema>;
