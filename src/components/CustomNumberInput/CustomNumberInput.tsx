import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import * as React from 'react';
import { useBatchForm } from '../../pages/addItem/batch/hooks/useBatchForm';
import { StyledButton, StyledInput, StyledInputRoot } from './styles';

const NumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>
) {
    const { numberOfItemsField } = useBatchForm();

    return (
        <BaseNumberInput
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <AddIcon fontSize="small" />,
                    className: 'increment',
                    type: 'button',
                },
                decrementButton: {
                    children: <RemoveIcon fontSize="small" />,
                    type: 'button',
                },
            }}
            {...props}
            onChange={numberOfItemsField.onChange}
            value={+numberOfItemsField.value}
            ref={ref}
        />
    );
});

export default function CustomNumberInput() {
    return <NumberInput aria-label="Quantity Input" min={1} max={200} />;
}
