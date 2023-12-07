import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import { ExampleUpload } from '../../../components/Upload/Upload.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { FormContainer } from '../styles.ts'

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
            <h3>Upload documentation</h3>
            <p>
                Add relevant documentation below.{' '}
                <ul>
                    Accepted formats:
                    <li> PDF, DOCX and JPG. </li>
                    <li> Maximum file size: 20mb </li>
                </ul>{' '}
            </p>
            <ExampleUpload />
            <span style={{ color: 'red' }}>{error}</span>
            <label>
                <input
                    type="radio"
                    name="checks"
                    onChange={() => setChecked(true)}
                />{' '}
                I have uploaded all necessary documentation for this item.{' '}
            </label>
            <ul>
                E.g:
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
                Next
            </Button>
        </FormContainer>
    )
}

export default Upload
