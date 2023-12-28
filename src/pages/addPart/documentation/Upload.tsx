import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import { ExampleUpload } from '../../../components/Upload/Upload.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { FormContainer } from '../styles.ts'
import { RadioWrapper, StyledInput } from '../batch/styles.ts'

const Upload = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing')
            return
        }
        navigate('/add-part/add-form')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={3} />
            <h3 style={{ marginBottom: '0' }}>Upload documentation</h3>
            <p>
                Add relevant documentation below.{' '}
                <ul style={{ marginLeft: '-25px' }}>
                    <li> Accepted formats: PDF, DOCX and JPG. </li>
                    <li> Maximum file size: 20MB </li>
                </ul>{' '}
            </p>
            {/* <ExampleUpload /> */}
            <span style={{ color: 'red' }}>{error}</span>
            <label>
                <RadioWrapper>
                    <StyledInput
                        type="checkbox"
                        name="checks"
                        onChange={() => setChecked(!checked)}
                    />{' '}
                    I have uploaded all necessary documentation for this item. E.g:{' '}
                </RadioWrapper>
            </label>
            <ul>
                <li>Proof of purchase (receipts).</li>
                <li>Drawings.</li>
                <li>Certificates.</li>
                <li>Photos.</li>
            </ul>
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

export default Upload
