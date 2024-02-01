import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UmAppContext from '../../../contexts/UmAppContext';
import { useAddVendor } from '../../../services/hooks/vendor/useAddVendor';
import { VendorSchema, vendorSchema } from './vendorValidator';

const defaultValues: VendorSchema = {
    name: '',
    addedById: '',
};

export const useAddVendorForm = () => {
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useAddVendor();
    const navigate = useNavigate();

    const methods = useForm<VendorSchema>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            ...defaultValues,
            addedById: currentUser?.id ?? '',
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
