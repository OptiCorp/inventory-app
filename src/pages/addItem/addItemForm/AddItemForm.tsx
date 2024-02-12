import { Button } from '../../../components/Button/Button';
import { ButtonWrapper, FormContainer } from '../styles';

import { FormContent } from './FormContent';

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
