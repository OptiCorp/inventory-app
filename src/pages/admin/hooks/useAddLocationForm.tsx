import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import UmAppContext from '../../../contexts/UmAppContext';
import { useAddLocation } from '../../../services/hooks/Locations/useAddLocation';
import { LocationSchema, locationSchema } from './locationValidator';

const defaultValues: LocationSchema = {
    name: '',
    addedById: '',
};

export const useAddLocationForm = () => {
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useAddLocation();
    const navigate = useNavigate();

    const methods = useForm<LocationSchema>({
        resolver: zodResolver(locationSchema),
        defaultValues: {
            ...defaultValues,
            addedById: currentUser?.id ?? '',
        },
    });
    const {
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
        register,
    } = methods;

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
