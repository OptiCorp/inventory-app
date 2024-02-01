import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { PartSchema } from '../../../pages/addPart/hooks/partValidator';
import apiService from '../../api';

type MutationObject = {
    items: PartSchema[];
    files?: File[];
};

export const useAddItems = () => {
    const api = apiService();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (object: MutationObject) => api.addItem(object.items, object.files),
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
