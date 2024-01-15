import { useQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: () => apiService().getLocation(),
    })
}
