import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TestSchema, testSchema } from './testValidator';

const defaultValues = {
    name: '',
    description: '',
};
export const useUpdateAdminForm = () => {
    const methods = useForm<TestSchema>({
        resolver: zodResolver(testSchema),
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
