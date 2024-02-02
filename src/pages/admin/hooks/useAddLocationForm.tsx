import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { useAddLocation } from '../../../services/hooks/locations/useAddLocation';
import { LocationSchema, locationSchema } from './locationValidator';

const defaultValues: LocationSchema = {
    name: '',
    addedById: '',
};

export const useAddLocationForm = () => {
    const { currentUser } = useContext(AppContext);
    const { mutate } = useAddLocation();
    const navigate = useNavigate();

    const methods = useForm<LocationSchema>({
        resolver: zodResolver(locationSchema),
        defaultValues: {
            ...defaultValues,
            addedById: currentUser?.id ?? '',
        },
    });
    const { handleSubmit, control, reset, resetField, register } = methods;

    const onSubmit = handleSubmit((data) => {
        mutate(data);
        navigate('/admin/locations');
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
