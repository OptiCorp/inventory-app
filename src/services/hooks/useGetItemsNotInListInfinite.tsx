import { useInfiniteQuery } from "@tanstack/react-query"
import apiService from "../api"

export const useGetItemsNotInListInfinite = (searchTerm: string, listId: string) => {
    return useInfiniteQuery({
        queryKey: ['list', searchTerm],
        queryFn: async ({ pageParam }) => apiService().getItemsNotInListBySearchString(encodeURIComponent(searchTerm), listId, pageParam),
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
