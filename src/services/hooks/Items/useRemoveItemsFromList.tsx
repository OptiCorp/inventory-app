import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api.ts'
import { MutateItemList } from '../../apiTypes.ts'

export const useRemoveItemsFromList = () => {
    const api = apiService()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (ids: MutateItemList) =>
            api.removeItemsFromList(ids.listId, ids.itemId),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['list'],
            }),
    })
}
