import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import UmAppContext from '../../../contexts/UmAppContext';

import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx';
import { PartSchema, partSchema } from './partValidator';

const defaultValues: PartSchema = {
    wpId: '',
    type: '',
    categoryId: '',
    serialNumber: '',
    productNumber: '',
    vendorId: '',
    locationId: '',
    description: '',

    comment: '',
    addedById: '',
    uniqueWpId: false,
    isBatch: false,
    isChecked: false,
    documentation: false,
    templateData: {
        id: '',
        name: '',
        inputValue: '',
        type: '',
        category: {
            id: '',
            name: '',
            userId: '',
        },
        productNumber: '',
        description: '',
    },
};

export const useAddPartForm = () => {
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useAddItems();
    const appLocation = useLocation();

    const methods = useForm<PartSchema>({
        resolver: zodResolver(partSchema),
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
        trigger,
        setValue,
        watch,
    } = methods;

    const onSubmit = handleSubmit((data) => {
        if (data.files) {
            const files = [...data.files];
            delete data.files;

            mutate(
                { items: [data], files: files },
                {
                    onSuccess: () => {
                        reset();
                    },
                }
            );
        } else {
            mutate(
                { items: [data], files: undefined },
                {
                    onSuccess: () => {
                        reset();
                    },
                }
            );
        }
    });

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        location: appLocation.pathname,
        register,
        reset,
        formState: { errors },
        trigger,
        setValue,
        resetField,
        watch,
    };
};
