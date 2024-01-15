import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api';

export const useDeleteList = () => {
    const api = apiService();
    const queryClient = useQueryClient();
    const navigate = useNavigate;
    return useMutation({
        mutationFn: (listId: string) => api.deleteList(listId),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['lists'],
            }),
    });
};
