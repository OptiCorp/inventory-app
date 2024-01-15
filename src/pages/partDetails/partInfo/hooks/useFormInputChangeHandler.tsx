import { useCallback } from 'react'
import { Item, UpdateItem } from '../../../../services/apiTypes'
import { SetState } from '../types'

export const useFormInputChangeHandler = () => {
    const handleInputChange = useCallback(
        (
            fieldName: keyof UpdateItem,
            value: string | undefined,
            setUpdated: SetState<Item>
        ) => {
            setUpdated((prev) => {
                return {
                    ...prev,
                    [fieldName]: value,
                }
            })
        },
        []
    )
    return handleInputChange
}
