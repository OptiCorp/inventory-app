import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetVendors = () => {
    return useQuery({
        queryKey: ['vendors'],
        queryFn: () => apiService().getVendor(),
    });
};
