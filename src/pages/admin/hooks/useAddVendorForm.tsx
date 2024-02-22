import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { useAddVendor } from '../../../services/hooks/vendor/useAddVendor';
import { VendorSchema, vendorSchema } from './vendorValidator';

const defaultValues: VendorSchema = {
    name: '',
    createdById: '',
};

export const useAddVendorForm = () => {
    const { currentUser } = useContext(AppContext);
    const { mutate } = useAddVendor();
    const navigate = useNavigate();

    const methods = useForm<VendorSchema>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            ...defaultValues,
            createdById: currentUser?.id ?? '',
        },
    });
    const { handleSubmit, control, reset, resetField, register } = methods;

    const onSubmit = handleSubmit((data) => {
        mutate(data);
        navigate('/admin/vendors');
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
