import { Button } from '../../../components/Button/Button.tsx';
import { ButtonWrapper, FormContainer } from '../styles.ts';
import { FormContent } from './FormContent.tsx';

export const AddItemForm = () => {
    return (
        <FormContainer>
            <h4>Add details</h4>
            <FormContent />
            <ButtonWrapper>
                <Button id="addItem" form="addItem" type="submit" variant="black">
                    FINISH
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};
