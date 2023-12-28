import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { AddDocument } from '../../apiTypes'

export const useUploadDocument = () => {
    const api = apiService()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (document: AddDocument) => api.addDocument(document),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['documents'],
            })
        },
    })
}
