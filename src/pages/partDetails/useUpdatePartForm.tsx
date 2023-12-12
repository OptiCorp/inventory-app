import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateItem } from '../../services/hooks/useUpdateItem'

import { z } from 'zod'

const partSchemaTest = z.object({
    id: z.string(),
    wpId: z.string(),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z.string().min(1, 'Product number is required'),
    type: z.string().min(1),
    location: z.string().nullish(),
    description: z.string(),
    vendor: z.string().min(1, 'Vendor is required'),
    addedById: z.string(),
    comment: z.string(),
    parentId: z.string().nullish(),
    category: z.string().nullish(),
})
export type PartSchemaTest = z.infer<typeof partSchemaTest>

/* const defaultValues: PartSchemaTest = {
    id: '',
    wpId: '',
    serialNumber: '',
    productNumber: '',
    type: 'Unit',
    location: '',
    description: '',
    parentId: '',
    vendor: '',
    addedById: 'testing',
    comment: '',
    category: '',
} */

export const useUpdatePartForm = (id: string, item: any) => {
    const { mutate } = useUpdateItem(id)
    console.log(item, 'item')
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

    const onSubmit = handleSubmit((data) => mutate(data))

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        location: appLocation.pathname,
        register,
        reset,
        formState: { errors },
        resetField,
    }
}
