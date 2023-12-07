import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../api'
import { AddItem } from '../apiTypes'

export const useAddItems = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (items: AddItem[]) => api.addItem(items),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['items'],
            }),
    })
}
