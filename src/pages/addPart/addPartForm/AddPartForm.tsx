import { FormProvider } from 'react-hook-form'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'

import { FormContainer } from '../styles.ts'

import { Button } from '../../../components/Button/SubmitButton.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { usePartsForm } from '../hooks/useAddPartForm.tsx'
import { FormContent } from './FormContent.tsx'
import { StyledForm } from './styles.ts'
import { useNavigate } from 'react-router-dom'
import { ButtonsWrapper } from '../../../components/Button/styles.ts'

type response = {
    error: string
}

// WIP
export const AddPartFormm = () => {
    const { methods, onSubmit, formState } = usePartsForm()
    const navigate = useNavigate()

    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm onSubmit={onSubmit} id="addPart">
                    <ProgressBar progressLevel={4} />
                    <h4>Add details</h4>
                    <FormContent />
                    <ButtonsWrapper>
                        <Button
                            backgroundColor={` ${COLORS.secondary}`}
                            color={` ${COLORS.primary}`}
                            onClick={() => navigate('/add-part/upload')}
                        >
                            Back
                        </Button>
                        <Button
                            id="addPart"
                            type="submit"
                            backgroundColor={`${COLORS.primary}`}
                            color={`${COLORS.secondary}`}
                        >
                            FINISH
                        </Button>
                    </ButtonsWrapper>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    )
}
