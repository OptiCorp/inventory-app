import { useCallback } from 'react';
import { SingleValue } from 'react-select';
import { SetState } from '../types';

export const useFormSelectChangeHandler = () => {
    const handleSelectChange = useCallback(
        (newValue: SingleValue<{ value: string }>, setSelected: SetState<string>) => {
            setSelected(newValue!.value);
        },
        []
    );
    return handleSelectChange;
};
