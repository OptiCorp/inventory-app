import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';

import { FormContainer } from '../styles.ts';

import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button.tsx';

import { COLORS } from '../../../style/GlobalStyles.ts';
import { FormContent } from './FormContent.tsx';

type response = {
    error: string;
};

// WIP
export const AddPartFormm = () => {
    const navigate = useNavigate();

    return (
        <FormContainer>
            <ProgressBar progressLevel={4} />
            <h4>Add details</h4>
            <FormContent />

            <Button
                id="addPart"
                type="submit"
                backgroundColor={`${COLORS.primary}`}
                color={`${COLORS.secondary}`}
            >
                FINISH
            </Button>
        </FormContainer>
    );
};
