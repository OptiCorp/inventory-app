import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { ItemTemplate } from '../../apiTypes';

export const useAddItemTemplate = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemTemplateBody: ItemTemplate) => api.addItemTemplate(itemTemplateBody),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['itemTemplate'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
