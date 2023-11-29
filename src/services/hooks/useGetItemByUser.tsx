import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import UmAppContext from '../../contexts/UmAppContext'
import apiService from '../api'

export const useGetItemsByUser = () => {
    const { currentUser } = useContext(UmAppContext)
    const api = apiService()

    return useQuery({
        queryKey: ['user_items'],
        queryFn: () => api.getItemsByUserId(currentUser?.id),
        enabled: !!currentUser?.id,
    })
}
