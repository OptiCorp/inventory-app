// import { useQuery } from '@tanstack/react-query'
// import apiService from '../api'
// import { Item } from '../apiTypes'

// export const useAddItems = (item: Item) => {
//     const api = apiService()
//     return useQuery({
//         queryKey: ['items', item],
//         queryFn: () => api.addItem(encodeURIComponent(item)),
//         enabled: !!item,
//     })
// }
