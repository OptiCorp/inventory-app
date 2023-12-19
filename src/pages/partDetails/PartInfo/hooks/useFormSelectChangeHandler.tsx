import { ChangeEvent, useCallback } from 'react'

import { SetState } from '../types'

const useFormSelectChangeHandler = () => {
    const handleSelectChange = useCallback(
        (event: ChangeEvent<HTMLTextAreaElement>, setSelected: SetState<string>) => {
            const newSelected = event.target.value
            setSelected(newSelected)
        },
        []
    )
    return handleSelectChange
}

export default useFormSelectChangeHandler
