import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../api'
import { UpdateItem } from '../apiTypes'

export const useUpdateItem = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (item: UpdateItem) => api.updateItemById(id, item),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items', id],
            })
        },
    })
}
