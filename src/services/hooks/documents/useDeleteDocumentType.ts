import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';

export const useDeleteDocumentType = (id: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.deleteDocumentTypeById(id),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['documentType'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
