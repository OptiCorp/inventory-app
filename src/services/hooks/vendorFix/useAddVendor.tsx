import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { AddVendor } from '../../apiTypes'

export const useAddVendor = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (vendor: AddVendor) => api.addVendor(vendor),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['vendors'],
            })
        },
    })
}
