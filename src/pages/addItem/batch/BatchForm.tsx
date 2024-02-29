import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { StyledErrorP } from '../../../components/AddItemFormFields/styles.ts';
import { FormContainer } from '../styles.ts';
import { useBatchForm } from './hooks/useBatchForm.tsx';
import { RadioWrapper, StyledInput } from './styles.ts';

export const BatchForm = () => {
    const { isBatch, onChangeIsBatch, numberOfItemsField, error } = useBatchForm();
    return (
        <FormContainer>
            {/* <h3>Add as a batch?</h3>
            <span style={{ color: 'red' }}>{error?.message}</span>

            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={!isBatch}
                        type="radio"
                        name="batchCheck"
                        onChange={() => onChangeIsBatch(false)}
                    />
                    <p>I want to add one unique item</p>
                </RadioWrapper>
            </label> */}
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={isBatch}
                        type="radio"
                        name="batchCheck"
                        onChange={() => onChangeIsBatch(true)}
                    />
                    <p>
                        I want to add a batch of several identical items, assigning a unique
                        WellPartner serial number to each of them
                    </p>
                </RadioWrapper>
            </label>
            {numberOfItemsField.value && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label>
                        <strong>Number of items:</strong>
                    </label>
                    <ErrorMessage
                        name="emptyAmount"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                    <TextField
                        {...numberOfItemsField}
                        type="number"
                        label="Amount"
                        size="small"
                        style={{ width: '80px' }}
                        InputProps={{ sx: { borderRadius: 0 } }}
                        inputProps={{ min: 0 }}
                        placeholder="number of items"
                    />
                </div>
            )}
        </FormContainer>
    );
};
