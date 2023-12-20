import { useCallback, useContext } from 'react'
import { Category, Item, Location, Vendor } from '../../../../services/apiTypes'
import { useFormContext } from 'react-hook-form'
import { PartInfoSchema } from '../../useUpdatePartForm'
import { useUpdateItem } from '../../../../services/hooks/Items/useUpdateItem'
import UmAppContext from '../../../../contexts/UmAppContext'
import { SetState } from '../types'

type FieldId = 'type' | 'categoryId' | 'locationId' | 'vendorId'

const useFormBlurSelectHandler = (obj: Item, options?: Category[] | Location[] | Vendor[]) => {
    const formContext = useFormContext<PartInfoSchema>()
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useUpdateItem(obj.id, currentUser!.id)
    const handleBlurSelectField = useCallback(
        (selected: string, field: FieldId, setSnackbarText: SetState<string>): void => {
            const fieldValue = obj[field]

            if (selected === fieldValue || !selected) return
            formContext.trigger().then(() => {
                mutate({
                    ...obj,
                    [field]: selected,
                })
                if (options) {
                    const selectedOption = options!.find((option) => option.id === selected)
                    setSnackbarText(
                        `${field.replace('Id', '').toUpperCase()} was changed to ${
                            selectedOption!.name
                        }`
                    )
                } else {
                    setSnackbarText(`${field.toUpperCase()} was changed to ${selected}`)
                }
            })
        },
        [formContext, mutate, obj, options]
    )

    return handleBlurSelectField
}

export default useFormBlurSelectHandler
