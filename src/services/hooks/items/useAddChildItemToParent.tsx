import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
export type AddChildItemIds = {
    itemId: string;
    childItemId: string;
};
export const useAddChildItemToParent = () => {
    const api = apiService();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: AddChildItemIds) => api.addChildItemToParent(ids.itemId, ids.childItemId),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['items'],
                })
                .catch((error) => {
                    console.error('Failed: ', error);
                });
        },
    });
};
