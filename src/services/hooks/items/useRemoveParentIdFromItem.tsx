import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'

export const useRemoveParentIdFromItem = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (itemId: string) => api.removeParentIdFromItem(itemId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items'],
            })
        },
    })
}
