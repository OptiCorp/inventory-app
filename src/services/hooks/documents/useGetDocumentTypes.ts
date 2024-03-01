import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetDocumentTypes = () => {
    return useQuery({
        queryKey: ['documentType'],
        queryFn: () => apiService().getDocumentTypes(),
    });
};
