import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useIsWpIdUnique = (id: string, enabled = true) => {
    return useQuery({
        queryKey: ['wpId', id],
        queryFn: () => apiService().isWpIdUnique(id),
        enabled: !!enabled,
    });
};
