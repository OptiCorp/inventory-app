import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';

export const useDeleteList = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (listId: string) => api.deleteList(listId),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['lists'],
            }),
    });
};
