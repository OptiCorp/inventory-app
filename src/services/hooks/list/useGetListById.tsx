import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

/**
 *
 * @param listId
 * @returns
 */
export const useGetListById = (listId: string) => {
    return useQuery({
        queryKey: ['list', listId],
        queryFn: () => apiService().getListById(listId),
    });
};
