import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import UmAppContext from '../../../contexts/UmAppContext';

import { useAddItemTemplate } from '../../../services/hooks/itemTemplates/useAddItemTemplate.tsx';
import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx';
import { PartSchema, TemplateSchema, partSchema } from './partValidator';

const defaultTemplate: TemplateSchema = {
    categoryId: '',
    id: '',
    name: '',
    inputValue: '',
    type: '',
    // category: {
    //     id: '',
    //     name: '',
    //     createdById: '',
    // },
    productNumber: '',
    description: '',
    createdById: '',
};

const defaultValues: PartSchema = {
    wpId: '',
    serialNumber: '',
    vendorId: '',
    locationId: '',
    itemTemplateId: '',
    comment: '',
    createdById: '',
    uniqueWpId: false,
    isBatch: false,
    preCheck: { check: false, comment: '' },
    documentation: false,
    // documents: {
    //     id: '',

    //     name: '',
    //     blobRef: '',
    //     contentType: '',
    //     bytes: '',
    // },
    itemTemplate: defaultTemplate,
};

export type AddTemplate = {
    name: string;
    type: string;
    categoryId: string;
    description: string;
    createdById: string;
    revision: string;
    productNumber: string;
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
    const { mutate: templateMutate } = useAddItemTemplate();
    const selectedTemplate = watch('itemTemplate');

    useEffect(() => {
        register('itemTemplate');
    }, [register]);

    useEffect(() => {
        if (selectedTemplate) {
            setValue('itemTemplate', selectedTemplate);
            setValue('itemTemplateId', selectedTemplate?.id);
        }
    }, []);
    console.log(selectedTemplate, 'dtttsefs');
    console.log(watch());

    const templateSubmit = (data: TemplateSchema) => {
        templateMutate({
            categoryId: data.categoryId || '',
            createdById: currentUser?.id ?? '',
            description: data.description || '',
            name: selectedTemplate?.name || '',
            productNumber: selectedTemplate?.productNumber || '',
            revision: '1.06',
            type: selectedTemplate?.type || '',
        });
    };

    const onSubmit = handleSubmit(
        (data) => {
            if (!selectedTemplate.id) {
                templateMutate({
                    categoryId: selectedTemplate.categoryId || '',
                    createdById: currentUser?.id ?? '',
                    description: selectedTemplate.description || '',
                    name: selectedTemplate?.name || '',
                    productNumber: selectedTemplate?.productNumber || '',
                    revision: '1.06',
                    type: selectedTemplate?.type || '',
                });
                console.log('template');
            }

            if (data.files) {
                const files = [...data.files];
                delete data.files;
                console.log(errors);
                mutate({ items: [data], files: files }, {});
            } else {
                mutate({ items: [data], files: undefined }, {});
            }
        },
        (errors) => console.log(errors)
    );

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
        templateSubmit,
        watch,
    };
};
