import { zodResolver } from '@hookform/resolvers/zod';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate';
import { TemplateSchema, templateSchema } from './templateValidator';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import { useForm } from 'react-hook-form';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';

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
    const { currentUser, setSnackbarText, setSnackbarSeverity } = useContext(AppContext);

    const methods = useForm<TemplateSchema>({
        resolver: zodResolver(templateSchema),
        defaultValues: {
            ...defaultValues,
            createdById: currentUser?.id,
        },
    });
    const { handleSubmit, control, reset, resetField, register, watch, formState } = methods;
    const onSubmit = handleSubmit((data) => {
        mutate(data, {
            onSuccess: (responseData) => {
                handleApiRequestSnackbar(
                    responseData,
                    `Template: ${data.revision}-${data.productNumber} created`,
                    setSnackbarSeverity,
                    setSnackbarText
                );
                reset({
                    ...defaultValues,
                    createdById: data.createdById,
                });
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
