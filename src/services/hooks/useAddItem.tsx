import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import apiService from '../api'
import { AddItem } from '../apiTypes'

export const useAddItems = () => {
    const api = apiService()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (item: AddItem[]) => api.addItem(item),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['items'],
            })
            navigate('/add-part')
        },
    })
}
