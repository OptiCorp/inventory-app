import { useCallback } from 'react'
import { SetState } from '../types'
import { SingleValue } from 'react-select'

export const useFormSelectChangeHandler = () => {
    const handleSelectChange = useCallback(
        (newValue: SingleValue<{ value: string }>, setSelected: SetState<string>) => {
            setSelected(newValue!.value)
        },
        []
    )
    return handleSelectChange
}
