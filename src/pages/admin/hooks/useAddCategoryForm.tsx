import { useContext } from 'react'
import { CategorySchema, categorySchema } from './categoryValidator'
import UmAppContext from '../../../contexts/UmAppContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAddCategory } from '../../../services/hooks/Category/useAddCategory'

const defaultValues: CategorySchema = {
    name: '',
    addedById: '',
}

export const useAddCategoryForm = () => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useAddCategory()

    const methods = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
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
