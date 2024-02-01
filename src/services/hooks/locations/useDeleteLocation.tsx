import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';

export const useDeleteLocation = (locationId: string) => {
    const api = apiService();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => api.deleteLocation(locationId),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['locations'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
        },
    });
};
