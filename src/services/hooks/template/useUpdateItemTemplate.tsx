import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { ItemTemplate } from '../../apiTypes';
export type UpdateItemTemplate = {
    id: string;
    itemTemplate: ItemTemplate;
};
/**
 *
 * @param id The item template id
 */
export const useUpdateItemTemplate = (id: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        mutationFn: (itemTemplate: ItemTemplate) => api.updateItemTemplateById(id, itemTemplate),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['itemTemplates'],
                })
                .catch((error) => {
                    console.error(console.error('Failed to invalidate queries: ', error));
                });
        },
        onError: (error) => {
            console.log('error', error);
        },
        throwOnError: true,
    });
};
