import { useQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => apiService().getCategory(),
    })
}
