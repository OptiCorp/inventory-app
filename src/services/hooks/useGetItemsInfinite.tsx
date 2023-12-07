import { useInfiniteQuery } from "@tanstack/react-query"
import apiService from "../api"

export const useGetItemsInfinite = (searchTerm: string) => {
    return useInfiniteQuery({
        queryKey: ['items', searchTerm],
        queryFn: async ({ pageParam }) => apiService().getItemsBySearchString(encodeURIComponent(searchTerm), pageParam),
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
