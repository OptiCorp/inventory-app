import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiService from '../../api';
import { MutateItemList } from '../../apiTypes';

export const useAddItemsToList = () => {
    const api = apiService();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: MutateItemList) =>
            api.addItemsToList(ids.listId, ids.itemId, ids.addSubItems ?? false),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['list'],
            }),
    });
};
