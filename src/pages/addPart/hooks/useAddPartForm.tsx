import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'
import { useAddItems } from '../../../services/hooks/Items/useAddItem'
import { PartSchema, partSchema } from './partValidator'
import useLocalStorage from '../../../hooks/useLocalStorage.ts'

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
    uniqueWpId: false,
}

enum Batch {
    yes,
    no,
    undefined,
}

export const usePartsForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddItems()
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage()

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

    const onSubmit = handleSubmit((data) => {
        mutate([data], {
            onSuccess: () => {
                setLocalStorageWithExpiry('batch-data', '', 0)
                setLocalStorageWithExpiry('checks-check', '', 0)
                setLocalStorageWithExpiry('checks-description', '', 0)
                setLocalStorageWithExpiry('upload-check', '', 0)
            },
        })
    })

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
