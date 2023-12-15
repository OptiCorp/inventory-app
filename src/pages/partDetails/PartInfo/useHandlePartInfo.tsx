import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import UmAppContext from '../../../contexts/UmAppContext'
import { PartInfoSchema } from '../useUpdatePartForm'
import { Item, UpdateItem } from '../../../services/apiTypes'
import { useUpdateItem } from '../../../services/hooks/Items/useUpdateItem'
import useSnackBar from '../../../hooks/useSnackbar'

const useHandlePartInfo = (obj: Item) => {
    const { currentUser } = useContext(UmAppContext)
    const formContext = useFormContext<PartInfoSchema>()
    const { mutate, status } = useUpdateItem(obj.id, currentUser!.id)
    const { snackbar, setSnackbarText } = useSnackBar()
    const [changedField, setChangedField] = useState('')

    const handleBlurSelectField = (selected: string, field: string, obj: Item) =>
        formContext.handleSubmit(() => {
            const fieldValue = obj[field]

            if (selected === fieldValue) return
            mutate({
                ...obj,
                [field]: selected,
            })
        })

    const handleBlurInputField = <T extends keyof UpdateItem>(field: T, updatedObject: Item) =>
        formContext.handleSubmit(() => {
            const fieldValue = updatedObject[field]
            if (!fieldValue || fieldValue === obj[field]) return

            mutate({
                ...obj,
                [field]: fieldValue,
            })
        })

    const handleSelectChange = (
        e: ChangeEvent<HTMLTextAreaElement>,
        setSelected: (text: string) => void
    ) => {
        const newSelected = e.target.value
        setSelected(newSelected)
    }

    const handleInputChange = (
        fieldName: keyof UpdateItem,
        value: string | undefined,
        setUpdated: React.Dispatch<React.SetStateAction<Item>>
        /* setChangedField: (value: React.SetStateAction<string>) => void */
    ) => {
        setUpdated((prev) => {
            return {
                ...prev,
                [fieldName]: value,
            }
        })
        setChangedField(fieldName)
    }

    useEffect(() => {
        if (status === 'success') {
            setSnackbarText(
                `${changedField
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .toLowerCase()} changed`
            )
        }

        if (status === 'error') {
            setSnackbarText('error')
        }
    }, [changedField, setSnackbarText, status])

    return {
        handleBlurSelectField,
        handleBlurInputField,
        handleInputChange,
        handleSelectChange,
        status,
        snackbar,
    }
}

export default useHandlePartInfo
