import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTemplate } from '../../../pages/addItem/hooks/useAddItemForm';
import apiService from '../../api';

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
