import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button.tsx';
import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';
import { FormContainer } from '../styles.ts';
import { RadioWrapper, StyledInput } from './styles.ts';

enum Batch {
    yes = 'yes',
    no = 'no',
    undefined = 'undefined',
}

const BatchForm = () => {
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage();
    const [batchType, setBatchType] = useState<Batch>(
        (getLocalStorageWithExpiry('batch-data') as Batch) ?? Batch.undefined
    );
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleClick = () => {
        if (batchType === Batch.undefined) {
            setError('One option must be picked');
            return;
        }
        navigate('/add-part/checks');
    };

    useEffect(() => {
        setLocalStorageWithExpiry('batch-data', batchType, 5);
    }, [batchType]);

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

            <Button variant="black" onClick={handleClick}>
                NEXT
            </Button>
        </FormContainer>
    );
};

export default BatchForm;
