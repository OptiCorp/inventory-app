import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { AddCategory } from '../../apiTypes'

export const useAddCategory = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: AddCategory) => api.addCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
    })
}
