import { useCallback, useContext } from 'react'
import { Category, Item, Location, Vendor } from '../../../../services/apiTypes'
import { useFormContext } from 'react-hook-form'
import { PartInfoSchema } from '../../useUpdatePartForm'
import { useUpdateItem } from '../../../../services/hooks/Items/useUpdateItem'
import UmAppContext from '../../../../contexts/UmAppContext'
import { SetState } from '../types'
import { AlertColor } from '@mui/material'

type FieldId = 'type' | 'categoryId' | 'locationId' | 'vendorId'

export const useFormBlurSelectHandler = (
    obj: Item,
    options?: Category[] | Location[] | Vendor[]
) => {
    const formContext = useFormContext<PartInfoSchema>()
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useUpdateItem(obj.id, currentUser!.id)
    const handleBlurSelectField = useCallback(
        (
            selected: string,
            field: FieldId,
            setSnackbarText: SetState<string>,
            setSnackbarSeverity: SetState<AlertColor>
        ): void => {
            const fieldValue = obj[field]
            // TODO: FIX infinite loop if text field left empty then open a select field
            if (selected === fieldValue || !selected) return
            formContext.handleSubmit(() => {
                mutate(
                    {
                        ...obj,
                        [field]: selected,
                    },
                    {
                        onSuccess: (data) => {
                            if (data.status >= 400 && data.status < 500) {
                                setSnackbarSeverity('error')
                                setSnackbarText(`${data.statusText}, please try again.`)
                                return
                            } else if (data.status >= 500) {
                                setSnackbarSeverity('error')
                                setSnackbarText(
                                    `Something went wrong on our end, refresh page and try again later.`
                                )
                                return
                            } else {
                                if (options) {
                                    const selectedOption = options.find(
                                        (option) => option.id === selected
                                    )
                                    setSnackbarText(
                                        `${field.replace('Id', '').toUpperCase()} was changed to ${
                                            selectedOption!.name
                                        }`
                                    )
                                } else {
                                    setSnackbarText(
                                        `${field.toUpperCase()} was changed to ${selected}`
                                    )
                                }
                            }
                        },
                    }
                )
            })()
        },
        [formContext, mutate, obj, options]
    )

    return handleBlurSelectField
}
