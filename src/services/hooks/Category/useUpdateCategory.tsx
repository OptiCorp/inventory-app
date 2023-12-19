import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { UpdateCategory } from '../../apiTypes'
import useSnackBar from '../../../hooks/useSnackbar'

export const useUpdateCategory = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (category: UpdateCategory) => api.updateCategoryById(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['categories', id],
            })
        },
    })
}
