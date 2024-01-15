import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { AddLocation } from '../../apiTypes'

export const useAddLocation = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (location: AddLocation) => api.addLocation(location),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['locations'],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error)
                })
        },
    })
}
