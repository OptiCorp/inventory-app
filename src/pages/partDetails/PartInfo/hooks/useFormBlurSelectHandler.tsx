import { useCallback, useContext } from 'react'
import { Item } from '../../../../services/apiTypes'
import { useFormContext } from 'react-hook-form'
import { PartInfoSchema } from '../../useUpdatePartForm'
import { useUpdateItem } from '../../../../services/hooks/Items/useUpdateItem'
import UmAppContext from '../../../../contexts/UmAppContext'
type FieldId = 'type' | 'categoryId' | 'locationId' | 'vendorId'

const useFormBlurSelectHandler = (obj: Item) => {
    const formContext = useFormContext<PartInfoSchema>()
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useUpdateItem(obj.id, currentUser!.id)
    const handleBlurSelectField = useCallback(
        (selected: string, field: FieldId): void => {
            const fieldValue = obj[field]
            if (selected === fieldValue || !selected) return
            formContext.trigger().then(() => {
                mutate({
                    ...obj,
                    [field]: selected,
                })
            })
        },
        [formContext, mutate, obj]
    )

    return handleBlurSelectField
}

export default useFormBlurSelectHandler
