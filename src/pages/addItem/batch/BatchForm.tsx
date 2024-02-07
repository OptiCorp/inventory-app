import { useController, useFormContext } from 'react-hook-form';
import { ItemSchema } from '../hooks/itemValidator';
import { FormContainer } from '../styles';
import { RadioWrapper, StyledInput } from './styles';

const BatchForm = () => {
    const { control } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name: 'isBatch',
    });

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
        </FormContainer>
    );
};

export default BatchForm;
