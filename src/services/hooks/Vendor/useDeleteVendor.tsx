import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'

export const useDeleteVendor = (vendorId: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => api.deleteVendor(vendorId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['vendors'],
            }).catch((error) => {
                console.error('Failed to invalidate queries: ', error)
            })
        },
    })
}
