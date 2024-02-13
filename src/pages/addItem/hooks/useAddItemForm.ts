import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { ItemTemplate } from '../../../services/apiTypes';
import { useAddItems } from '../../../services/hooks/items/useAddItem';
import { useAddItemTemplate } from '../../../services/hooks/template/useAddItemTemplate';
import { ItemSchema, TemplateSchema, itemSchema } from './itemValidator';

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
    wpId: [],
    serialNumber: [],
    vendorId: '',
    locationId: '',
    itemTemplateId: '',
    comment: '',
    createdById: '',
    uniqueWpId: false,
    uniqueSerialNumber: false,
    isBatch: false,
    preCheck: { check: false, comment: '' },
    documentation: false,
    itemTemplate: defaultTemplate,
    numberOfItems: '',
};

export const useAddItemForm = () => {
    const { currentUser, setSnackbarText } = useContext(AppContext);
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

                const numberOfItems = parseInt(data.numberOfItems);
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
                            createdById: currentUser!.id,
                        },
                    });
                }
                mutate(
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
                const numberOfItems = parseInt(data.numberOfItems);
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
                mutate(
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
