import { useCallback } from 'react'
import { SetState } from '../types'
import { Item, UpdateItem } from '../../../../services/apiTypes'

const useFormInputChangeHandler = () => {
    const handleInputChange = useCallback(
        (fieldName: keyof UpdateItem, value: string | undefined, setUpdated: SetState<Item>) => {
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

export default useFormInputChangeHandler
