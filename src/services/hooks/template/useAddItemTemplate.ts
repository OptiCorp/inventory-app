import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { AddTemplate } from '../../apiTypes';

export const useAddItemTemplate = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemTemplateBody: AddTemplate) => api.addItemTemplate(itemTemplateBody),
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
