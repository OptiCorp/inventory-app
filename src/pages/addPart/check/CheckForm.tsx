import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/Button/SubmitButton'
import ProgressBar from '../../../components/progressBar/ProgressBar'
import { COLORS } from '../../../style/GlobalStyles'
import { FormContainer } from '../styles'
import { FormRadio, StyledLabelText, StyledTextArea } from './styles'
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
                    <input
                        type="radio"
                        name="checks"
                        onChange={() => setChecked(true)}
                    />{' '}
                    I have performed all necessary checks before adding this
                    item to the system
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
                Next
            </Button>
        </FormContainer>
    )
}

export default CheckForm
