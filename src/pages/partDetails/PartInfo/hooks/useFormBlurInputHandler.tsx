import { useCallback, useContext } from 'react'
import { Item, UpdateItem } from '../../../../services/apiTypes'
import { useFormContext } from 'react-hook-form'
import { PartInfoSchema } from '../../useUpdatePartForm'
import UmAppContext from '../../../../contexts/UmAppContext'
import { useUpdateItem } from '../../../../services/hooks/Items/useUpdateItem'
import { SetState } from '../types'
import { AlertColor } from '@mui/material'

export const useFormBlurInputHandler = (obj: Item) => {
    const formContext = useFormContext<PartInfoSchema>()
    const { currentUser } = useContext(UmAppContext)
    const { mutate } = useUpdateItem(obj.id, currentUser!.id)
    const handleBlurInputField = useCallback(
        <T extends keyof UpdateItem>(
            field: T,
            updatedObject: Item,
            setSnackbarText: SetState<string>,
            setSnackbarSeverity: SetState<AlertColor>,
            shortSnackbarText?: boolean
        ) => {
            formContext.handleSubmit(() => {
                const fieldValue = updatedObject[field]
                if (!fieldValue || fieldValue === obj[field]) return

                mutate(
                    {
                        ...obj,
                        [field]: fieldValue,
                    },
                    {
                        onSuccess(data) {
                            if (data) {
                                if (data.status >= 400) {
                                    setSnackbarSeverity('error')
                                    setSnackbarText(`${data.statusText}, please try again.`)
                                } else if (data.status >= 500) {
                                    setSnackbarSeverity('error')
                                    setSnackbarText(
                                        `Something went wrong on our end, please try again later.`
                                    )
                                } else if (shortSnackbarText) {
                                    setSnackbarText(`${field.toUpperCase()} was updated`)
                                } else {
                                    setSnackbarText(
                                        `${field.toUpperCase()} was changed to ${fieldValue}`
                                    )
                                }
                            }
                        },
                    }
                )
            })()
        },
        [formContext, mutate, obj]
    )
    return handleBlurInputField
}
