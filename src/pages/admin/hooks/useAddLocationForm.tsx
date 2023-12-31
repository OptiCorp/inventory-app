import { useContext } from 'react'
import { LocationSchema, locationSchema } from './locationValidator'
import UmAppContext from '../../../contexts/UmAppContext'
import { useAddLocation } from '../../../services/hooks/Locations/useAddLocation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

const defaultValues: LocationSchema = {
    name: '',
    addedById: '',
}

export const useAddLocationForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddLocation()
    const navigate = useNavigate()

    const methods = useForm<LocationSchema>({
        resolver: zodResolver(locationSchema),
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
        navigate('/admin/locations')
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
