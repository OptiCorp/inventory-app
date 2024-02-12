import { useController, useFormContext } from 'react-hook-form';
import { ItemSchema } from '../hooks/itemValidator.ts';
import { FormContainer } from '../styles.ts';
import { RadioWrapper, StyledInput } from './styles.ts';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { StyledErrorP } from '../../../components/AddItemFormFields/styles.ts';

const BatchForm = () => {
    const { control, register, setValue } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name: 'isBatch',
    });

    useEffect(() => {
        if (!value) {
            setValue('numberOfItems', '1');
        }
    }, []);

    return (
        <FormContainer>
            <h3>Add as a batch?</h3>
            <span style={{ color: 'red' }}>{error?.message}</span>

            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={!value}
                        type="radio"
                        name="batchCheck"
                        onChange={() => onChange(false)}
                    />
                    <p>I want to add one unique item</p>
                </RadioWrapper>
            </label>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={value}
                        type="radio"
                        name="batchCheck"
                        onChange={() => onChange(true)}
                    />
                    <p>
                        I want to add a batch of several identical items, assigning a unique
                        WellPartner serial number to each of them
                    </p>
                </RadioWrapper>
            </label>
            {value && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label>
                        <strong>Number of items:</strong>
                    </label>
                    <ErrorMessage
                        name="emptyAmount"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                    <TextField
                        {...register('numberOfItems')}
                        type="number"
                        label="Amount"
                        style={{ width: '80px' }}
                        InputProps={{ sx: { borderRadius: 0 } }}
                        inputProps={{ min: 1 }}
                        placeholder="number of items"
                    />
                </div>
            )}
        </FormContainer>
    );
};

export default BatchForm;
