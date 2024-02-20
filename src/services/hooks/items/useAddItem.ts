import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import apiService from '../../api';

type MutationObject = {
    items: ItemSchema[];
    files?: File[];
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
            navigate('/add-item');
        },
    });
};
