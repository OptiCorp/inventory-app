import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetListById = (listId: string) => {
    const api = apiService();
    return useQuery({
        queryKey: ['list', listId],
        queryFn: () => api.getListById(listId),

        enabled: !!listId,
    });
};
