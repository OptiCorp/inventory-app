// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'
// import apiService from '../../api'
// import { AddItem, Vendor } from '../../apiTypes'

// export const useAddVendor = () => {
//     const api = apiService()

//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: (vendor: Vendor) => api.addVendor(vendor),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['items'],
//             })
//             navigate('/add-part')
//         },
//     })
// }
