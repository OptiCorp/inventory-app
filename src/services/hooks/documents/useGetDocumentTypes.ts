import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetDocumentTypes = () => {
    return useQuery({
        queryKey: ['docuementTypes'],
        queryFn: () => apiService().getDocumentTypes(),
    });
};
