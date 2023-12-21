import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/Button/SubmitButton'
import ProgressBar from '../../../components/progressBar/ProgressBar'
import { COLORS } from '../../../style/GlobalStyles'
import { FormContainer } from '../styles'
import { FormRadio, StyledLabelText, StyledTextArea } from './styles'
import { RadioWrapper, StyledInput } from '../batch/styles.ts'
const CheckForm = () => {
    const [checked, setChecked] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing')
            return
        }
        navigate('/add-part/upload')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={2} />
            <h3>Pre-checks</h3>
            <span style={{ color: 'red' }}>{error}</span>
            <FormRadio>
                <label>
                    <RadioWrapper>
                        <StyledInput
                            type="checkbox"
                            name="checks"
                            onChange={() => setChecked(!checked)}
                        />{' '}
                        I have performed all necessary checks before adding this item to the system
                    </RadioWrapper>
                </label>

                <StyledLabelText>
                    Describe what has been checked, and inform about deviations
                </StyledLabelText>
                <StyledTextArea id="textArea" rows={5} cols={40} />
            </FormRadio>
            <Button
                backgroundColor={` ${COLORS.primary}`}
                color={` ${COLORS.secondary}`}
                onClick={handleClick}
            >
                NEXT
            </Button>
        </FormContainer>
    )
}

export default CheckForm
