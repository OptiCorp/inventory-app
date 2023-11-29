import { SubmitHandler, useForm } from 'react-hook-form'
import { useLocation } from 'react-router'

import apiService from '../../../services/api'
import UmAppContext from '../../../contexts/UmAppContext'
import { useContext, useState } from 'react'
import { Item } from '../../../services/apiTypes'

type AddPartsForm = {
    WPId: string
    SerialNumber: string
    ProductNumber: string
    Type: string
    Description: string
    Vendor: string
    AddedById: string
}

enum Batch {
    yes,
    no,
    undefined,
}

export const useAddTaskForm = () => {
      const [myItems, setMyItems] = useState<Item[]>()
     const [batchType, setBatchType] = useState<Batch>(Batch.undefined)
     const [error, setError] = useState<string>()
    const appLocation = useLocation()
const { currentUser } = useContext(UmAppContext)
    const methods = useForm<AddPartsForm>({})
    const { handleSubmit, control, reset, resetField, watch } = methods

    const api = apiService()

    const onSubmit: SubmitHandler<AddPartsForm> = async (
        data: AddPartsForm
    ) => {}

    return {
        methods,
        onSubmit,
        control,
        handleSubmit,
        location: appLocation.pathname,

        reset,
        resetField,
    }
}
