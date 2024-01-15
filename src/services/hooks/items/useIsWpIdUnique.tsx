import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useIsWpIdUnique = (id: string) => {
    return useQuery({
        queryKey: ['wpId', id],
        queryFn: () => apiService().isWpIdUnique(id),
    });
};
