import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    DocumentTypeSchema,
    documentTypeSchema,
} from '../../pages/admin/hooks/documentTypeValidator';

const defaultValues = {
    name: '',
    description: '',
};
export const useUpdateAdminForm = () => {
    const methods = useForm<DocumentTypeSchema>({
        resolver: zodResolver(documentTypeSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const { control, reset, resetField, register, formState } = methods;

    return {
        methods,
        control,
        reset,
        resetField,
        register,
        formState,
    };
};
