import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../api'
import { AddList } from '../apiTypes'
export const useAddList = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (list: AddList) => api.addList(list),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ['lists'],
            }),
    })
}