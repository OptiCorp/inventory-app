import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { UpdateLocation } from '../../apiTypes'

export const useUpdateLocation = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (location: UpdateLocation) => api.updateLocationById(id, location),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['locations', id],
            }).catch((error) => {
                console.error('Failed to invalidate queries: ', error)
            })
        },
    })
}
