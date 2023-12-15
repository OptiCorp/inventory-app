import { useInfiniteQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetLocationsInfinite = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: ['locations', searchTerm],
        queryFn: async ({ pageParam }) =>
            apiService().getLocationBySearchString(encodeURIComponent(searchTerm)),
        initialPageParam: 1,
        getNextPageParam: (lastPage, _pages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined
            }
            return lastPageParam + 1
        },
        enabled: !!searchTerm,
    })
}
