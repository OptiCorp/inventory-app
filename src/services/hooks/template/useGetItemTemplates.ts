import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetItemTemplates = () => {
    return useQuery({
        queryKey: ['itemTemplate'],
        queryFn: () => apiService().getItemTemplates(),
    });
};
