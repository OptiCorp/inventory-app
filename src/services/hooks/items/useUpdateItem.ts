import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { UpdateItem } from '../../apiTypes';

export const useUpdateItem = (id: string, updatedById: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: UpdateItem) => api.updateItemById(id, item, updatedById),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['items', id],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
