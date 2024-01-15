import { useInfiniteQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetCategoriesInfinite = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: ['categories', searchTerm],
        queryFn: async () => apiService().getCategoryBySearchString(encodeURIComponent(searchTerm)),
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
