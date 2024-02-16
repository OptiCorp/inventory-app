import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';

export const useDeleteItemById = (itemId: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (itemId: string) => api.deleteItemById(itemId),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['items', itemId],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
