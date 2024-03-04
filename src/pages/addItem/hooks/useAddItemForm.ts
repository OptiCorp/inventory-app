import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import AppContext from '../../../contexts/AppContext';
import { ItemTemplate, Item } from '../../../services/apiTypes';
import { useAddItems } from '../../../services/hooks/items/useAddItem';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate';
import { ItemSchema, TemplateSchema, itemSchema } from './itemValidator';
import { useUploadDocumentToItem } from '../../../services/hooks/documents/useUploadDocumentToItem.ts';
import { useUploadDocumentToTemplate } from '../../../services/hooks/documents/useUploadDocumentToTemplate.ts';

const defaultTemplate: TemplateSchema = {
    categoryId: '',
    id: '',
    inputValue: '',
    type: '',
    productNumber: '',
    description: '',
    createdById: '',
    revision: '',
};

const defaultValues: ItemSchema = {
    wpId: [uuid().slice(0, 8)],
    serialNumber: [uuid().slice(0, 8)],
    vendorId: '',
    locationId: '',
    itemTemplateId: '',
    comment: '',
    createdById: '',
    uniqueWpId: true,
    uniqueSerialNumber: true,
    isBatch: false,
    preCheck: { check: false, comment: '' },
    documentation: false,
    itemTemplate: defaultTemplate,
    documentTypes: [],
    uploadToTemplate: [],
    files: [],
    numberOfItems: 1,
};

export const useAddItemForm = () => {
    const { currentUser, setSnackbarText } = useContext(AppContext);
    const { mutateAsync: mutateItemsAsync } = useAddItems();
    const appLocation = useLocation();
    const { mutateAsync: mutateUploadToItemAsync } = useUploadDocumentToItem();
    const { mutateAsync: mutateUploadToTemplateAsync } = useUploadDocumentToTemplate();

    const methods = useForm<ItemSchema>({
        mode: 'onChange',
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
        getValues,
        watch,
    } = methods;
    const { mutateAsync: templateMutate } = useAddItemTemplate();
    const selectedTemplate = watch('itemTemplate');
    const files = getValues('files');
    const documentTypes = getValues('documentTypes');
    const uploadToTemplate = getValues('uploadToTemplate');
    let createdItems: Item[] = [];

    useEffect(() => {
        register('itemTemplate');
    }, [register]);

    useEffect(() => {
        if (selectedTemplate) {
            setValue('itemTemplate', selectedTemplate);
            setValue('itemTemplateId', selectedTemplate?.id);
            setValue('itemTemplate.revision', selectedTemplate.revision || '');
        }
    }, []);

    const templateSubmit = async () => {
        const data = await templateMutate({
            categoryId: selectedTemplate.categoryId || '',
            createdById: currentUser?.id ?? '',
            description: selectedTemplate.description || '',
            productNumber: selectedTemplate?.productNumber || '',
            revision: selectedTemplate.revision || '',
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
                    revision,
                    description,
                } = await templateSubmit();

                const numberOfItems = data.numberOfItems;
                const items: ItemSchema[] = [];
                for (let i = 0; i < numberOfItems; i++) {
                    items.push({
                        ...data,
                        itemTemplateId,
                        wpId: data.wpId[i] as unknown as string[],
                        serialNumber: data.serialNumber[i] as unknown as string[],
                        itemTemplate: {
                            id: itemTemplateId,
                            type,
                            categoryId,
                            productNumber,
                            description,
                            revision,
                            createdById: currentUser!.id,
                        },
                    });
                }
                createdItems = await mutateItemsAsync(
                    {
                        items,
                        files: undefined,
                    },
                    {
                        onSuccess: () => {
                            reset({
                                ...defaultValues,
                                createdById: data.createdById,
                            });
                            setSnackbarText(`Template and item(s) added`);
                        },
                    }
                );
            } else {
                const numberOfItems = data.numberOfItems;
                const items: ItemSchema[] = [];
                for (let i = 0; i < numberOfItems; i++) {
                    items.push({
                        ...data,
                        itemTemplateId: data.itemTemplate.id,
                        wpId: data.wpId[i] as unknown as string[],
                        serialNumber: data.serialNumber[i] as unknown as string[],
                        createdById: currentUser!.id,
                    });
                }
                createdItems = await mutateItemsAsync(
                    {
                        items,
                        files: undefined,
                    },
                    {
                        onSuccess: () => {
                            reset({
                                ...defaultValues,
                                createdById: data.createdById,
                            });
                            setSnackbarText(`Item(s) added`);
                        },
                    }
                );
            }
            if (files!.length > 0) {
                await Promise.all(
                    files!.map(async (file, index) => {
                        if (uploadToTemplate[index]) {
                            await mutateUploadToTemplateAsync({
                                document: {
                                    file: file,
                                    documentTypeId: documentTypes[index]!,
                                },
                                templateId: selectedTemplate.id,
                            });
                        } else {
                            await Promise.all(
                                createdItems.map(async (item) => {
                                    await mutateUploadToItemAsync({
                                        document: {
                                            file: file,
                                            documentTypeId: documentTypes[index]!,
                                        },
                                        itemId: item.id,
                                    });
                                })
                            );
                        }
                    })
                );
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
        onchange,
        watch,
    };
};
