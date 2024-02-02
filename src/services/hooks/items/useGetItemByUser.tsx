import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';
import apiService from '../../api';

export const useGetItemsByUser = () => {
    const { currentUser } = useContext(AppContext);
    const api = apiService();

    return useQuery({
        queryKey: ['items', 'by_user'],
        queryFn: () => api.getItemsByUserId(currentUser?.id),
        enabled: !!currentUser?.id,
    });
};
