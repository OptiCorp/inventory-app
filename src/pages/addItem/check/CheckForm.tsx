import { useController, useFormContext } from 'react-hook-form';
import { RadioWrapper, StyledInput } from '../batch/styles.ts';
import { ItemSchema } from '../hooks/itemValidator.ts';
import { FormContainer } from '../styles';
import { StyledLabelText, StyledTextArea } from './styles';

const CheckForm = () => {
    const { control, register } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name: 'preCheck.check',
    });

    return (
        <FormContainer>
            <h3>Pre-checks</h3>
            <span style={{ color: 'red' }}>{error?.message}</span>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={value}
                        type="checkbox"
                        name="checks"
                        onChange={() => onChange(!value)}
                    />{' '}
                    <p>
                        I have performed all necessary checks before adding this item to the system
                    </p>
                </RadioWrapper>
            </label>
            <StyledLabelText>
                Describe what has been checked, and inform about deviations
            </StyledLabelText>
            <StyledTextArea id="textArea" {...register('preCheck.comment')} rows={5} cols={40} />
        </FormContainer>
    );
};

export default CheckForm;
