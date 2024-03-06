import { ErrorMessage } from '@hookform/error-message';
import { StyledErrorP } from '../../../components/AddItemFormFields/styles.ts';
import CustomNumberInput from '../../../components/CustomNumberInput/CustomNumberInput.tsx';
import { FormContainer, StyledLabelText } from '../styles.ts';
import { StyledBatchWrapper } from './styles.ts';

export const BatchForm = () => {
    return (
        <FormContainer>
            <StyledBatchWrapper>
                <h3>Batch</h3>
                <StyledLabelText>Number of items to add</StyledLabelText>

                <CustomNumberInput />

                <ErrorMessage
                    name="numberOfItems"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledBatchWrapper>
        </FormContainer>
    );
};
