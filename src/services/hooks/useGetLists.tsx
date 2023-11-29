import { useQuery } from '@tanstack/react-query'
import apiService from '../api'

export const useGetLists = (searchTerm: string, userId: string | undefined) => {
    const api = apiService()
    console.log(searchTerm, 'useGetLists')
    return useQuery({
        queryKey: ['lists', searchTerm],
        queryFn: () =>
            apiService().getListsBySearchString(encodeURIComponent(searchTerm), userId),
        enabled: !!searchTerm,
    })
}
