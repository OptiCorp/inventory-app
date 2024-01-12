import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'
import useLocalStorage from '../../../hooks/useLocalStorage.ts'
import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx'
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
    uniqueWpId: false,
}

export const useAddPartForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddItems()
    const { deleteLocalStorage } = useLocalStorage()

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
        if (data.files) {
            const files = [...data.files!]
            delete data.files

            mutate(
                { items: [data], files: files },
                {
                    onSuccess: () => {
                        deleteLocalStorage('batch-data')
                        deleteLocalStorage('checks-check')
                        deleteLocalStorage('checks-description')
                        deleteLocalStorage('upload-check')
                        reset()
                    },
                }
            )
        } else {
            mutate(
                { items: [data], files: undefined },
                {
                    onSuccess: () => {
                        deleteLocalStorage('batch-data')
                        deleteLocalStorage('checks-check')
                        deleteLocalStorage('checks-description')
                        deleteLocalStorage('upload-check')
                        reset()
                    },
                }
            )
        }
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
