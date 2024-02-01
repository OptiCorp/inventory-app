import { Button } from '../../../components/Button/Button.tsx';
import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';

import { ButtonWrapper, FormContainer } from '../styles.ts';

import { FormContent } from './FormContent.tsx';

// WIP
export const AddPartForm = () => {
    return (
        <FormContainer>
            <ProgressBar progressLevel={4} />
            <h4>Add details</h4>
            <FormContent />
            <ButtonWrapper>
                <Button id="addPart" type="submit" variant="black">
                    FINISH
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};
