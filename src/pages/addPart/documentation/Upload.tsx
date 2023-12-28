import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import { ExampleUpload } from '../../../components/Upload/Upload.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { FormContainer } from '../styles.ts'
import { RadioWrapper, StyledInput } from '../batch/styles.ts'
import useLocalStorage from '../../../hooks/useLocalStorage.ts'
import { ButtonsWrapper } from '../../../components/Button/styles.ts'

const Upload = () => {
    const navigate = useNavigate()
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage()
    const [checked, setChecked] = useState<boolean>(
        getLocalStorageWithExpiry('upload-check') === 'true'
    )
    const [error, setError] = useState<string>()
    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing')
            return
        }
        navigate('/add-part/add-form')
    }

    useEffect(() => {
        setLocalStorageWithExpiry('upload-check', checked.toString(), 5)
    }, [checked])

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
                        checked={checked}
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
            <ButtonsWrapper>
                <Button
                    backgroundColor={` ${COLORS.secondary}`}
                    color={` ${COLORS.primary}`}
                    onClick={() => navigate('/add-part/checks')}
                >
                    Back
                </Button>
                <Button
                    backgroundColor={` ${COLORS.primary}`}
                    color={` ${COLORS.secondary}`}
                    onClick={handleClick}
                >
                    NEXT
                </Button>
            </ButtonsWrapper>
        </FormContainer>
    )
}

export default Upload
