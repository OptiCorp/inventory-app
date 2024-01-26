import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';
export const useGetItemTemplateById = (id: string) => {
    const api = apiService();
    return useQuery({
        queryKey: ['itemTemplateId', id],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        queryFn: () => api.getItemTemplateById(id),
        enabled: !!id,
    });
};
