import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { FormContainer } from '../styles.ts'
import { ExampleUpload } from '../../../components/Upload/Upload.tsx'

const Upload = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing')
            return
        }
        navigate('/add-part/upload')
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
            <Button onClick={handleClick}>Next</Button>
        </FormContainer>
    )
}

export default Upload
