import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/SubmitButton.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { FormContainer } from '../styles.ts'

const Upload = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/add-part/add-form')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={3} />
            <h3>Upload documentation</h3>
            <input type="file" />

            <Button onClick={handleClick}>Next</Button>
        </FormContainer>
    )
}

export default Upload
