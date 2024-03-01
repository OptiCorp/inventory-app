import { useNavigate } from 'react-router-dom';
import { DocumentTypeSchema, documentTypeSchema } from './documentTypeValidator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddDocumentType } from '../../../services/hooks/documents/useAddDocumentType';

const defaultValues: DocumentTypeSchema = {
    name: '',
    description: '',
};
export const useAddDocumentTypeForm = () => {
    const navigate = useNavigate();
    const { mutate } = useAddDocumentType();

    const methods = useForm<DocumentTypeSchema>({
        resolver: zodResolver(documentTypeSchema),
        defaultValues: {
            ...defaultValues,
        },
    });

    const { handleSubmit, control, reset, resetField, register } = methods;

    const onSubmit = handleSubmit((data) => {
        navigate('/admin/document-types');
        mutate(data);
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
