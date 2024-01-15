import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiService from '../../api'
import { AddDocument } from '../../apiTypes'
import useSleep from '../../../hooks/useSleep'
import { useContext } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'

export const useUploadDocument = () => {
    const Sleep = useSleep()
    const api = apiService()
    const queryClient = useQueryClient()
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    return useMutation({
        mutationFn: async (document: AddDocument) => await api.addDocument(document),
        onSettled: async (data, _errors, documents) => {
            while (!data![0]) {
                await Sleep(200)
            }
            setSnackbarText('Documents were uploaded')
            queryClient.invalidateQueries({
                queryKey: [documents.itemId],
            })
        },
    })
}
