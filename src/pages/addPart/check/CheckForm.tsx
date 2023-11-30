import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/SubmitButton'
import ProgressBar from '../../../components/progressBar/ProgressBar'
import { FormContainer, FormRadio } from '../styles'
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
                <label>
                    Describe what has been checked, and inform about deviations
                    <br />
                    <textarea
                        rows={5}
                        cols={40}
                        style={{ backgroundColor: '#eeeeee' }}
                    ></textarea>
                </label>
            </FormRadio>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button onClick={handleClick}>Next</Button>
            </div>
        </FormContainer>
    )
}

export default CheckForm
