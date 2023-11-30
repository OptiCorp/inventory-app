import { useQuery } from '@tanstack/react-query'
import apiService from '../api'

export const useGetListsByUserId = (userId: string) => {
    const api = apiService()

    return useQuery({
        queryKey: ['lists', userId],
        queryFn: () =>
            apiService().getListsByUserId(userId),
    })
}
