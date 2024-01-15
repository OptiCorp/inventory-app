import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { UpdateList } from '../../apiTypes'

export const useUpdateList = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (list: UpdateList) => api.updateList(id, list),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['list', id],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error)
                })
        },
    })
}
