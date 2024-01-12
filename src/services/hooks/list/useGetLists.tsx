import { useQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetLists = (searchTerm: string, userId: string) => {
    const api = apiService()

    return useQuery({
        queryKey: ['lists', searchTerm],
        queryFn: () => apiService().getListsBySearchString(encodeURIComponent(searchTerm), userId),
        enabled: !!searchTerm,
    })
}
