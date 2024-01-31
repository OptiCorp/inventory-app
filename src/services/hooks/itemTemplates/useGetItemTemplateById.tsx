import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetItemTemplateById = (id: string) => {
    const api = apiService();

    return useQuery({
        queryKey: ['itemTemplate', id],
        queryFn: () => api.getItemTemplateById(id),
        enabled: !!id,
    });
};
