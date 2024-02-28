import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TestSchema, testSchema } from './testValidator';

const defaultValues = {
    name: '',
    description: '',
};
export const useTestForm = (id: string) => {
    const methods = useForm<TestSchema>({
        resolver: zodResolver(testSchema),
        defaultValues: {
            ...defaultValues,
        },
    });
    console.log('id', id);

    const { /* handleSubmit, */ control, reset, resetField, register } = methods;

    /* const onSubmit = handleSubmit((data) => {
        console.log('data: ', data);
    }, console.log); */

    return {
        methods,
        /* onSubmit, */
        control,
        reset,
        resetField,
        register,
    };
};
