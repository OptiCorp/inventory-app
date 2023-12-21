import { useContext } from 'react'
import { VendorSchema, vendorSchema } from './vendorValidator'
import UmAppContext from '../../../contexts/UmAppContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddVendor } from '../../../services/hooks/Vendor/useAddVendor'
import { useNavigate } from 'react-router-dom'

const defaultValues: VendorSchema = {
    name: '',
    addedById: '',
}

export const useAddVendorForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddVendor()
    const navigate = useNavigate()

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

    const onSubmit = handleSubmit((data) => {
        mutate(data)
        navigate('/admin/vendors')
    })

    return {
        methods,
        onSubmit,
        control,
        reset,
        resetField,
        register,
    }
}
