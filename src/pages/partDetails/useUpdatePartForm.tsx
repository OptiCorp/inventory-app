import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Item } from '../../services/apiTypes';

const partInfoSchema = z.object({
    id: z.string(),
    wpId: z.string(),
    serialNumber: z.string().min(1, 'Serial number is required'),
    productNumber: z
        .string()
        .min(1, 'Product number is required')
        .max(20, 'Product number must be at most 20 characters'),
    description: z.string().max(450, 'Description must be at most 450 characters'),
    parentId: z.string().nullish(),
});
export type PartInfoSchema = z.infer<typeof partInfoSchema>;

export const useUpdatePartForm = (item: Item) => {
    const appLocation = useLocation();

    const methods = useForm<PartInfoSchema>({
        resolver: zodResolver(partInfoSchema),
        values: item,
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
