import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { z } from 'zod'

const partSchemaTest = z.object({
    id: z.string(),
    wpId: z.string(),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z
        .string()
        .min(1, 'Product number is required')
        .max(20, 'Product number must be at most 20 characters'),
    type: z.string().min(1),
    location: z.string().nullish(),
    description: z.string(),
    /* vendor: z.string().min(1, 'Vendor is required'), */
    // addedById: z.string(),
    // comment: z.string(),
    parentId: z.string().nullish(),
    category: z.string().nullish(),
})
export type PartSchemaTest = z.infer<typeof partSchemaTest>

export const useUpdatePartForm = (item: any) => {
    const appLocation = useLocation()

    const methods = useForm<PartSchemaTest>({
        resolver: zodResolver(partSchemaTest),
        values: item,
    })

    const {
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
        register,
    } = methods

    return {
        methods,
        control,
        handleSubmit,
        location: appLocation.pathname,
        register,
        reset,
        formState: { errors },
        resetField,
    }
}
