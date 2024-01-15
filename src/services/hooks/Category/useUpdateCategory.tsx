import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { UpdateCategory } from '../../apiTypes'

export const useUpdateCategory = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: UpdateCategory) => api.updateCategoryById(id, category),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['categories', id],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error)
                })
        },
    })
}
