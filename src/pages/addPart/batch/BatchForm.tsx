import { useController, useFormContext } from 'react-hook-form';
import { PartSchema } from '../hooks/partValidator.ts';
import { FormContainer } from '../styles.ts';
import { RadioWrapper, StyledInput } from './styles.ts';

const BatchForm = () => {
    const { control } = useFormContext<PartSchema>();
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
                    <p>I want to add one unique part</p>
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
                        I want to add a batch of several identical parts, assigning a unique
                        WellPartner serial number to each of them
                    </p>
                </RadioWrapper>
            </label>
        </FormContainer>
    );
};

export default BatchForm;
