import { useQuery } from '@tanstack/react-query'
import apiService from '../api'

export const useGetItems = (searchTerm: string) => {
    return useQuery({
        queryKey: ['items', searchTerm],
        queryFn: () =>
            apiService().getItemsBySearchString(encodeURIComponent(searchTerm)),
        enabled: !!searchTerm,
    })
}
