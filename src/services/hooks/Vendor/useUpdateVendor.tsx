// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import apiService from '../../api'
// import { Vendor } from '../../apiTypes'

// export const useUpdateVendor = (id: string) => {
//     const api = apiService()
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: (vendor: Vendor) => api.updateItemById(id, vendor),
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: ['vendor', id],
//             })
//         },
//     })
// }
