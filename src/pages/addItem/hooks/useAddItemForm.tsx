import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import AppContext from '../../../contexts/AppContext';
import { AddDocument, Item, ItemTemplate } from '../../../services/apiTypes.ts';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useAddItems } from '../../../services/hooks/items/useAddItem.tsx';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate.tsx';
import { ItemSchema, TemplateSchema, itemSchema } from './itemValidator';
import { useUploadDocumentToItem } from '../../../services/hooks/documents/useUploadDocumentToItem.ts';

const defaultTemplate: TemplateSchema = {
    categoryId: '',
    id: '',
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
    files: null,
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
    const { currentUser } = useContext(AppContext);
    const { mutate, data: newItem } = useAddItems();
    const { mutate: uploadFile } = useUploadDocumentToItem();
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
                            },
                            itemTemplateId,
                        },
                    ],
                });

                if (data.files) {
                    const item = (await newItem?.json()) as Item;
                    data.files.forEach((file) => {
                        const document: AddDocument = {
                            file: file.document,
                            documentTypeId: file.documentTypeId,
                        };
                        uploadFile({ document, itemId: item.id });
                    });
                }
            }
        },

        (errors) => console.error(errors)
    );

    const onSubmitTyped: (e?: React.BaseSyntheticEvent<object> | undefined) => Promise<void> =
        onSubmit;

    return {
        methods,
        onSubmitTyped,
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
