import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { FormContainer } from '../styles.ts'
import { FormBatchRadio, RadioWrapper, StyledInput } from './styles.ts'

enum Batch {
    yes,
    no,
    undefined,
}

const BatchForm = () => {
    const [batchType, setBatchType] = useState<Batch>(Batch.undefined)
    const [error, setError] = useState<string>()
    const navigate = useNavigate()

    const handleClick = () => {
        if (batchType === Batch.undefined) {
            setError('One option must be picked')
            return
        }
        navigate('/add-part/checks')
    }

    return (
        <FormContainer>
            <ProgressBar progressLevel={1} />
            <h3>Add as a batch?</h3>
            <span style={{ color: 'red' }}>{error}</span>

            <FormBatchRadio>
                <label>
                    <RadioWrapper>
                        <StyledInput
                            type="radio"
                            name="batchCheck"
                            onChange={() => setBatchType(Batch.no)}
                        />{' '}
                        I want to add one unique part
                    </RadioWrapper>
                </label>
                <label>
                    <RadioWrapper>
                        <StyledInput
                            type="radio"
                            name="batchCheck"
                            onChange={() => setBatchType(Batch.yes)}
                        />{' '}
                        <div>
                            I want to add a batch of several identical parts, assigning a unique
                            WellPartner serial number to each of them
                        </div>
                    </RadioWrapper>
                </label>
            </FormBatchRadio>

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
