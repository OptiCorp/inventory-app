import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { z } from 'zod';
import { Item } from '../../../../services/apiTypes';

const itemInfoSchema = z.object({
    id: z.string(),
    wpId: z.string(),
    serialNumber: z.string(),
    comment: z.string(),
    productNumber: z
        .string()
        .min(1, 'Product number is required')
        .max(20, 'Product number must be at most 20 characters'),
    description: z.string().max(450, 'Description must be at most 450 characters'),
    parentId: z.string().nullish(),
    category: z.object({
        createdDate: z.string(),
        id: z.string(),
        name: z.string(),
        updatedDate: z.string(),
        userId: z.string(),
        value: z.string(),
        label: z.string(),
    }),
    categoryId: z.string(),
    vendor: z.object({
        createdDate: z.string(),
        id: z.string(),
        name: z.string(),
        updatedDate: z.string(),
        userId: z.string(),
        value: z.string(),
        label: z.string(),
    }),
    vendorId: z.string(),
    location: z.object({
        createdDate: z.string(),
        id: z.string(),
        name: z.string(),
        updatedDate: z.string(),
        userId: z.string(),
        value: z.string(),
        label: z.string(),
    }),
    locationId: z.string(),
    itemTemplate: z.object({
        type: z.string(),
    }),
    /* type: z.string(), */
});
export type ItemInfoSchema = z.infer<typeof itemInfoSchema> & {
    'itemTemplate.productNumber': string;
    'itemTemplate.description': string;
    'itemTemplate.category': string;
    'itemTemplate.type': string;
    'itemTemplate.revision': string;
};

export const useUpdateItemForm = (item: Item) => {
    const appLocation = useLocation();

    const methods = useForm<Item>({
        resolver: zodResolver(itemInfoSchema),
        values: item,
        mode: 'onBlur',
    });

    const {
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
        register,
    } = methods;

    return {
        methods,
        control,
        handleSubmit,
        location: appLocation.pathname,
        register,
        reset,
        formState: { errors },
        resetField,
    };
};
