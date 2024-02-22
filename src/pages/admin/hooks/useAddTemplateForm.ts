import { zodResolver } from '@hookform/resolvers/zod';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate';
import { TemplateSchema, templateSchema } from './templateValidator';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import { useForm } from 'react-hook-form';

const defaultValues: TemplateSchema = {
    productNumber: '',
    categoryId: '',
    createdById: '',
    description: '',
    revision: '',
    type: '',
};

export const useAddTemplateForm = () => {
    const { mutate } = useAddItemTemplate();
    const { currentUser, setSnackbarText } = useContext(AppContext);

    const methods = useForm<TemplateSchema>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            ...defaultValues,
            createdById: currentUser?.id,
        },
    });
    const { handleSubmit, control, reset, resetField, register, watch, formState } = methods;
    const onSubmit = handleSubmit((data) => {
        console.table(data);
        mutate(data, {
            onSuccess: () => {
                /* TODO: Add snackbar if status code 400/500 etc */
                reset({
                    ...defaultValues,
                    createdById: data.createdById,
                });
                setSnackbarText(`Template: ${data.revision}-${data.productNumber} created`);
            },
        });
    });

    return {
        methods,
        onSubmit,
        control,
        reset,
        resetField,
        register,
        watch,
        formState,
    };
};
