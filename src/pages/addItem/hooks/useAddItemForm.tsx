import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import UmAppContext from '../../../contexts/UmAppContext';

import { ItemTemplate } from '../../../services/apiTypes.ts';

import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate.tsx';
import { ItemSchema, TemplateSchema, itemSchema } from './itemValidator';

const defaultTemplate: TemplateSchema = {
    categoryId: '',
    id: '',
    name: '',
    inputValue: '',
    type: '',

    productNumber: '',
    description: '',
    createdById: '',
};

const defaultValues: ItemSchema = {
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

export const useAddItemForm = () => {
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useAddItems();
    const appLocation = useLocation();

    const methods = useForm<ItemSchema>({
        resolver: zodResolver(itemSchema),
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
    const { mutateAsync: templateMutate } = useAddItemTemplate();
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

    const templateSubmit = async () => {
        const data = await templateMutate({
            categoryId: selectedTemplate.categoryId || '',
            createdById: currentUser?.id ?? '',
            description: selectedTemplate.description || '',
            name: selectedTemplate?.name || '',
            productNumber: selectedTemplate?.productNumber || '',
            revision: '1.06',
            type: selectedTemplate?.type || '',
        });
        return data.json() as Promise<ItemTemplate>;
    };

    const onSubmit = handleSubmit(
        async (data) => {
            if (!selectedTemplate.id) {
                const {
                    id: itemTemplateId,
                    name,
                    categoryId,
                    productNumber,
                    type,
                    description,
                } = await templateSubmit();

                mutate({
                    items: [
                        {
                            ...data,
                            itemTemplate: {
                                id: itemTemplateId,

                                type: type,
                                categoryId: categoryId,
                                productNumber: productNumber,

                                description: description,
                                createdById: currentUser?.id ?? '',
                                name: name ?? '',
                            },
                            itemTemplateId,
                        },
                    ],
                    files: undefined,
                });
            }

            if (data.files) {
                const files = [...data.files];
                delete data.files;
                mutate({
                    items: [{ ...data, itemTemplateId: selectedTemplate?.id }],
                    files: files,
                });
            } else {
                mutate({
                    items: [{ ...data, itemTemplateId: selectedTemplate?.id }],
                    files: undefined,
                });
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
