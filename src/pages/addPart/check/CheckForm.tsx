import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/SubmitButton'
import ProgressBar from '../../../components/progressBar/ProgressBar'
import { FormContainer, FormRadio } from '../styles'
import { StyledTextArea } from './styles'
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
                <label htmlFor="textArea">
                    Describe what has been checked, and inform about deviations{' '}
                </label>
                <StyledTextArea
                    id="textArea"
                    rows={5}
                    cols={40}
                ></StyledTextArea>{' '}
            </FormRadio>
            <Button onClick={handleClick}>Next</Button>
        </FormContainer>
    )
}

export default CheckForm
