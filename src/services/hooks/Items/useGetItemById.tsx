import { useQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetItemById = (id: string) => {
    const api = apiService()

    return useQuery({
        queryKey: ['items'],
        queryFn: () => api.getItemById(id),
        enabled: !!id,
    })
}
