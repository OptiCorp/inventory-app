import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { UpdateVendor } from '../../apiTypes'

export const useUpdateVendor = (id: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (vendor: UpdateVendor) => api.updateVendorById(id, vendor),
        onSuccess: () => {
            queryClient
                .invalidateQueries({
                    queryKey: ['vendor', id],
                })
                .catch((error) => {
                    console.error('Failed to invalidate queries: ', error)
                })
        },
    })
}
