import { useQuery } from '@tanstack/react-query'
import apiService from '../../api'

export const useGetDocumentsByItemId = (itemId: string) => {
    return useQuery({
        queryKey: ['documents', itemId],
        queryFn: () => apiService().getDocumentsByItemId(itemId),
    })
}
