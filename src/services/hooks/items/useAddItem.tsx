import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api';
import { AddItem } from '../../apiTypes';

type MutationObject = {
    items: AddItem[];
};

export const useAddItems = () => {
    const api = apiService();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (object: MutationObject) => api.addItem(object.items),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['items'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error);
                });
            navigate('/add-part');
        },
    });
};
