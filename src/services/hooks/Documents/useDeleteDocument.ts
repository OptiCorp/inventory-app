import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { useContext } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'

export const useDeleteDocument = (itemId: string) => {
    const api = apiService()
    const queryClient = useQueryClient()
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    return useMutation({
        mutationFn: (documentId: string) => api.deleteDocument(documentId, itemId),
        onSettled(_data, error) {
            error ? setSnackbarText(error.message) : setSnackbarText('Document deleted')
            queryClient.invalidateQueries({
                queryKey: [itemId],
            })
        },
    })
}
