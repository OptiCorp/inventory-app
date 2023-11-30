// import { SubmitHandler, useForm } from 'react-hook-form'
// import { useLocation } from 'react-router'

// import { useEffect, useState } from 'react'
// import apiService from '../../../services/api'
// import { Item } from '../../../services/apiTypes'

// type AddPartsForm = {
//     WPId: string
//     SerialNumber: string
//     ProductNumber: string
//     Type: []
//     Description: string
//     Vendor: string
//     AddedById: string
//     Comment: string
//     User: string
// }

// enum Batch {
//     yes,
//     no,
//     undefined,
// }

// export const usePartsForm = () => {
//     const [myItems, setMyItems] = useState<Item[]>()
//     const [batchType, setBatchType] = useState<Batch>(Batch.undefined)

//     const appLocation = useLocation()

//     const methods = useForm<AddPartsForm>({})
//     const {
//         handleSubmit,
//         control,
//         reset,
//         resetField,
//         setError,
//         formState: { errors },
//         register,
//     } = methods

//     const api = apiService()

//     const onSubmit: SubmitHandler<AddPartsForm> = async (
//         data: AddPartsForm
//     ) => {

// useEffect(() => {
//       setError('lastName', {
//           types: {
//               required: 'This is required',

//           },
//       })
//   }, [setValue])

//         if (
//             !['unit', 'assembly', 'sub-assembly', 'part'].includes(
//                 type.toLowerCase()
//             )
//         ) { return { error: 'Type must be Unit, Assembly, Sub-assembly or Item' }
//         } else {
//         }
//     }

//     return {
//         methods,
//         onSubmit,
//         control,
//         handleSubmit,
//         location: appLocation.pathname,
//         register,
//         reset,
//         error,
//         resetField,
//     }
// }
