import { useQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useIsSerialNumberUnique = (serialNumber: string, enabled = true) => {
    return useQuery({
        queryKey: ['serialNumber', serialNumber],
        queryFn: () => apiService().isSerialNumberUnique(serialNumber),
        enabled: !!enabled,
    });
};
