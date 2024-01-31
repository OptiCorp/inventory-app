import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import UmAppContext from '../../../contexts/UmAppContext';

import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx';
import { PartSchema, TemplateSchema, partSchema } from './partValidator';

const defaultTemplate: TemplateSchema = {
    categoryId: '',
    id: '',
    name: '',
    inputValue: '',
    type: '',
    category: {
        id: '',
        name: '',
        createdById: '',
        createdDate: '',
        updatedDate: '',
    },
    productNumber: '',
    description: '',
};

const defaultValues: PartSchema = {
    wpId: '',
    type: '',
    categoryId: '',
    serialNumber: '',
    productNumber: '',
    vendorId: '',
    locationId: '',
    description: '',
    itemTemplateId: '',
    comment: '',
    createdById: '',
    uniqueWpId: false,
    isBatch: false,
    preCheck: { check: false, comment: '' },
    documentation: false,
    documents: {
        id: '',

        name: '',
        blobRef: '',
        contentType: '',
        bytes: '',
    },
    templateData: defaultTemplate,
};

export const useAddPartForm = () => {
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useAddItems();
    const appLocation = useLocation();

    const methods = useForm<PartSchema>({
        resolver: zodResolver(partSchema),
        defaultValues: {
            ...defaultValues,
            createdById: currentUser?.id ?? '',
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

    const selectedTemplate = watch('templateData');

    useEffect(() => {
        register('templateData');
    }, [register]);

    useEffect(() => {
        if (selectedTemplate) {
            setValue('templateData', selectedTemplate);
        }
    }, []);

    const onSubmit = handleSubmit((data) => {
        console.log(errors);
        if (data.files) {
            const files = [...data.files];
            delete data.files;
            console.log(errors);
            mutate({ items: [data], files: files }, {});
        } else {
            mutate({ items: [data], files: undefined }, {});
        }

        console.log(data, defaultValues, 'fsdf');
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
