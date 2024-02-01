import { Button } from '../../../components/Button/Button.tsx';
import { ButtonWrapper, FormContainer } from '../styles.ts';

import { FormContent } from './FormContent.tsx';

export const AddPartForm = () => {
    return (
        <FormContainer>
            <h4>Add details</h4>
            <FormContent />
            <ButtonWrapper>
                <Button id="addPart" form="addPart" type="submit" variant="black">
                    FINISH
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};
