import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import apiService from '../api'

export const useGetItems = (searchTerm: string, pageNumber: number) => {
    return useQuery({
        queryKey: ['items', searchTerm, pageNumber],
        queryFn: () =>
            apiService().getItemsBySearchString(encodeURIComponent(searchTerm), pageNumber),
        enabled: !!searchTerm,
    })
}


