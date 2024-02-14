import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TemplateSchema } from '../../../pages/addItem/hooks/itemValidator';
import apiService from '../../api';
export type UpdateItemTemplate = {
    id: string;
    itemTemplate: TemplateSchema;
};

export const useUpdateItemTemplate = (id: string, updatedById: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemTemplate: TemplateSchema) =>
            api.updateItemTemplateById(id, itemTemplate, updatedById),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['itemTemplate', id],
                })
                .catch((error) => {
                    console.error(console.error('Failed to invalidate queries: ', error));
                });
        },
    });
};
