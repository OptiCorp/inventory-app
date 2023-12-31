import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { FormContainer } from '../styles.ts'
import { FormBatchRadio, RadioWrapper, StyledInput } from './styles.ts'
import useLocalStorage from '../../../hooks/useLocalStorage.ts'

enum Batch {
    yes = 'yes',
    no = 'no',
    undefined = 'undefined',
}

const BatchForm = () => {
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage()
    const [batchType, setBatchType] = useState<string>(
        getLocalStorageWithExpiry('batch-data') || Batch.undefined
    )
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const handleClick = () => {
        if (batchType === Batch.undefined) {
            setError('One option must be picked')
            return
        }
        navigate('/add-part/checks')
    }

    useEffect(() => {
        setLocalStorageWithExpiry('batch-data', batchType, 5)
    }, [batchType])

    return (
        <FormContainer>
            <ProgressBar progressLevel={1} />
            <h3>Add as a batch?</h3>
            <span style={{ color: 'red' }}>{error}</span>

            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={batchType === Batch.no ? true : false}
                        type="radio"
                        name="batchCheck"
                        onChange={() => setBatchType(Batch.no)}
                    />{' '}
                    <p>I want to add one unique part</p>
                </RadioWrapper>
            </label>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={batchType === Batch.yes ? true : false}
                        type="radio"
                        name="batchCheck"
                        onChange={() => setBatchType(Batch.yes)}
                    />{' '}
                    <p>
                        I want to add a batch of several identical parts, assigning a unique
                        WellPartner serial number to each of them
                    </p>
                </RadioWrapper>
            </label>

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

export default BatchForm
