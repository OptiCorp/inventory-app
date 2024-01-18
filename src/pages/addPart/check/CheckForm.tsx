import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button.tsx';
import { ButtonsWrapper } from '../../../components/Button/styles.ts';
import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';
import { RadioWrapper, StyledInput } from '../batch/styles.ts';
import { FormContainer } from '../styles';
import { FormRadio, StyledLabelText, StyledTextArea } from './styles';

const CheckForm = () => {
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage();
    const [checked, setChecked] = useState<boolean>(
        getLocalStorageWithExpiry('checks-check') === 'true'
    );
    const [description, setDescription] = useState<string>(
        getLocalStorageWithExpiry('checks-description') ?? ''
    );
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing');
            return;
        }
        navigate('/add-part/upload');
    };

    useEffect(() => {
        setLocalStorageWithExpiry('checks-check', checked.toString(), 5);
    }, [checked]);

    useEffect(() => {
        setLocalStorageWithExpiry('checks-description', description, 5);
    }, [description]);

    return (
        <FormContainer>
            <ProgressBar progressLevel={2} />
            <h3>Pre-checks</h3>
            <span style={{ color: 'red' }}>{error}</span>
            <FormRadio>
                <label>
                    <RadioWrapper>
                        <StyledInput
                            checked={checked}
                            type="checkbox"
                            name="checks"
                            onChange={() => setChecked(!checked)}
                        />{' '}
                        <p>
                            I have performed all necessary checks before adding this item to the
                            system
                        </p>
                    </RadioWrapper>
                </label>

                <StyledLabelText>
                    Describe what has been checked, and inform about deviations
                </StyledLabelText>
                <StyledTextArea
                    id="textArea"
                    rows={5}
                    cols={40}
                    onBlur={(e) => setDescription(e.currentTarget.value)}
                    defaultValue={description}
                />
            </FormRadio>
            <ButtonsWrapper>
                <Button variant="black" onClick={handleClick}>
                    NEXT
                </Button>
            </ButtonsWrapper>
        </FormContainer>
    );
};

export default CheckForm;
