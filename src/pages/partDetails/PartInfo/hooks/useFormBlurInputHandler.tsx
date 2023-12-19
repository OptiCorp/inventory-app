import { useCallback, useContext } from 'react'
import { Item, UpdateItem } from '../../../../services/apiTypes'
import { useFormContext } from 'react-hook-form'
import { PartInfoSchema } from '../../useUpdatePartForm'
import UmAppContext from '../../../../contexts/UmAppContext'
import { useUpdateItem } from '../../../../services/hooks/Items/useUpdateItem'

const useFormBlurInputHandler = (obj: Item) => {
    const formContext = useFormContext<PartInfoSchema>()
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useUpdateItem(obj.id, currentUser!.id)

    const handleBlurInputField = useCallback(
        <T extends keyof UpdateItem>(field: T, updatedObject: Item) => {
            formContext.trigger()
            const fieldValue = updatedObject[field]
            if (!fieldValue || fieldValue === obj[field]) return

            mutate({
                ...obj,
                [field]: fieldValue,
            })
        },
        [formContext, mutate, obj]
    )
    return handleBlurInputField
}

export default useFormBlurInputHandler
