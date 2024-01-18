import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';

import { FormContainer } from '../styles.ts';

import { Button } from '../../../components/Button/Button.tsx';
import { ButtonsWrapper } from '../../../components/Button/styles.ts';
import { FormContent } from './FormContent.tsx';

// WIP
export const AddPartForm = () => {
    return (
        <FormContainer>
            <ProgressBar progressLevel={4} />
            <h4>Add details</h4>
            <FormContent />
            <ButtonsWrapper>
                <Button id="addPart" type="submit" variant="black">
                    FINISH
                </Button>
            </ButtonsWrapper>
        </FormContainer>
    );
};
