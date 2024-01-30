import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TemplateSchema } from '../../../pages/addPart/hooks/partValidator';
import apiService from '../../api';
export type UpdateItemTemplate = {
    id: string;
    itemTemplate: TemplateSchema;
};
/**
 *
 * @param id The item template id
 */
export const useUpdateItemTemplate = (id: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemTemplate: TemplateSchema) => api.updateItemTemplateById(id, itemTemplate),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['itemTemplate'],
                })
                .catch((error) => {
                    console.error(console.error('Failed to invalidate queries: ', error));
                });
        },
    });
};
