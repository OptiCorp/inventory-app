import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'

export const useDeleteCategory = (categoryId: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => api.deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
    })
}
