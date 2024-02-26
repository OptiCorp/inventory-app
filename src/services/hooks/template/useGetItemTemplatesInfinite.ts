import { useInfiniteQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetItemTemplatesInfinite = (searchTerm: string) => {
    const api = apiService();
    return useInfiniteQuery({
        queryKey: ['itemTemplate', searchTerm],
        queryFn: async ({ pageParam }) => {
            const itemTemplates = await api.getItemTemplatesBySearchString(
                encodeURIComponent(searchTerm),
                pageParam
            );
            return itemTemplates;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _pages, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        enabled: !!searchTerm,
    });
};
