import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { AddItem, Item } from '../../../services/apiTypes'
import { useAddItems } from '../../../services/hooks/useAddItem'

export const partSchema = z.object({
    wpId: z.string(),
    description: z.string(),
    serialNumber: z.string(),
    productNumber: z.string(),
    vendor: z.string(),
    type: z.union([
        z.literal('unit'),
        z.literal('assembly'),
        z.literal('subassembly'),
        z.literal('part'),
    ]),
    comment: z.string().nullish(),
    location: z.string().nullish(),
    parentId: z.string().nullish(),
    addedById: z.string(),
})


type PartSchema = z.infer<typeof partSchema>

enum Batch {
    yes,
    no,
    undefined,
}

export const usePartsForm = () => {
    const [myItems, setMyItems] = useState<Item[]>()
    const [batchType, setBatchType] = useState<Batch>(Batch.undefined)
    const { mutate, isSuccess } = useAddItems()

    const appLocation = useLocation()

    const methods = useForm<PartSchema>({
        resolver: zodResolver(partSchema),
    })
    const {
        handleSubmit,
        control,
        reset,
        setValue,
        resetField,
        setError,
        formState: { errors },
        register,
    } = methods

    useEffect(() => {
        setError('description', {
            types: {
                required: 'This is required',
                minLength: 'min 5 characters',
            },
        })
    }, [setValue])

    const onSubmit = (data: PartSchema) => mutate([data])



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
