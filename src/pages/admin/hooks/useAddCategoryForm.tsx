import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { useAddCategory } from '../../../services/hooks/category/useAddCategory';
import { CategorySchema, categorySchema } from './categoryValidator';

const defaultValues: CategorySchema = {
    name: '',
    addedById: '',
};

export const useAddCategoryForm = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AppContext);
    const { mutate } = useAddCategory();

    const methods = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            ...defaultValues,
            addedById: currentUser?.id ?? '',
        },
    });
    const { handleSubmit, control, reset, resetField, register } = methods;

    const onSubmit = handleSubmit((data) => {
        mutate(data);
        navigate('/admin/categories');
    });

    return {
        methods,
        onSubmit,
        control,
        reset,
        resetField,
        register,
    };
};
