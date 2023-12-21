import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'
import { useAddItems } from '../../../services/hooks/Items/useAddItem'
import { PartSchema, partSchema } from './partValidator'

const defaultValues: PartSchema = {
    wpId: '',
    type: '',
    categoryId: '',
    serialNumber: '',
    productNumber: '',
    vendorId: '',
    locationId: '',
    description: '',
    comment: '',
    addedById: '',
}

enum Batch {
    yes,
    no,
    undefined,
}

export const usePartsForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddItems()

    const appLocation = useLocation()

    const methods = useForm<PartSchema>({
        resolver: zodResolver(partSchema),
        defaultValues: {
            ...defaultValues,
            addedById: currentUser?.id || '',
        },
    })
    const {
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
        register,
    } = methods

    const onSubmit = handleSubmit((data) => mutate([data]))

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
