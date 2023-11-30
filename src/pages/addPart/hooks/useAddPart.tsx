import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Item } from '../../../services/apiTypes'
import { useAddItems } from '../../../services/hooks/useAddItem'

const partSchema = z.object({
    wpId: z.string(),
    description: z.string(),
    serialNumber: z.string(),
    productNumber: z.string(),
    vendor: z.string(),
    type: z.union([
        z.literal('unit'),
        z.literal('assembly'),
        z.literal('sub-assembly'),
        z.literal('sub-sart'),
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
    const navigate = useNavigate()
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
    } = useForm<PartSchema>({
        resolver: zodResolver(partSchema),
    })

    useEffect(() => {
        setError('description', {
            types: {
                required: 'This is required',
                minLength: 'min 5 characters',
            },
        })
    }, [setValue])

    const onSubmit = () =>
        handleSubmit((data) =>
            mutate(data, {
                onSuccess: () => {
                    console.log('sucess')
                    navigate('/add-part')
                },
            })
        )

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
