import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetDocumentTypeById = (id: string) => {
    const api = apiService();
    return useQuery({
        queryKey: [id],
        queryFn: () => api.getDocumentTypeById(id),
    });
};
