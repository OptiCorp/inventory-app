import { useContext } from 'react'
import { VendorSchema, vendorSchema } from './vendorValidator'
import UmAppContext from '../../../contexts/UmAppContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddVendor } from '../../../services/hooks/Vendor/useAddVendor'

const defaultValues: VendorSchema = {
    name: '',
    addedById: '',
}

export const useAddVendorForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddVendor()

    const methods = useForm<VendorSchema>({
        resolver: zodResolver(vendorSchema),
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

    const onSubmit = handleSubmit((data) => mutate(data))

    return {
        methods,
        onSubmit,
        control,
        reset,
        resetField,
        register,
    }
}
