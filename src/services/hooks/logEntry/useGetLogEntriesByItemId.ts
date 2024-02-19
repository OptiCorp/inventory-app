import { useInfiniteQuery } from '@tanstack/react-query';
import apiService from '../../api';

export const useGetLogEntriesByItemId = (id: string, includeTemplateEntries = true) => {
    const api = apiService();
    return useInfiniteQuery({
        queryKey: ['logEntry'],
        queryFn: async ({ pageParam }) => {
            const logEntries = await api.getLogEntriesByItemId(
                id,
                pageParam,
                includeTemplateEntries
            );
            return logEntries;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _pages, lastPageParam) => {
            if (lastPage.length < 10) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        enabled: !!id,
    });
};
