import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button.tsx';

import ProgressBar from '../../../components/ProgressBar/ProgressBar.tsx';
import AddPartUpload from '../../../components/Upload/AddPartUpload.tsx';
import AddPartUploadMobile from '../../../components/Upload/UploadMobile/AddPartUploadMobile.tsx';
import useLocalStorage from '../../../hooks/useLocalStorage.ts';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions.ts';
import { RadioWrapper, StyledInput } from '../batch/styles.ts';
import { FormContainer } from '../styles.ts';
import { ButtonWrapper } from './styles.ts';

const Upload = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { setLocalStorageWithExpiry, getLocalStorageWithExpiry } = useLocalStorage();
    const [checked, setChecked] = useState<boolean>(
        getLocalStorageWithExpiry('upload-check') === 'true'
    );
    const [error, setError] = useState<string>();
    const handleClick = () => {
        if (!checked) {
            setError('Tick box before continuing');
            return;
        }
        navigate('/add-part/add-form');
    };

    useEffect(() => {
        setLocalStorageWithExpiry('upload-check', checked.toString(), 5);
    }, [checked]);

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
            {width > 500 ? <AddPartUpload /> : <AddPartUploadMobile />}

            <span style={{ color: 'red' }}>{error}</span>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={checked}
                        type="checkbox"
                        name="checks"
                        onChange={() => setChecked(!checked)}
                    />{' '}
                    <p>I have uploaded all necessary documentation for this item. E.g: </p>
                </RadioWrapper>
            </label>
            <ul>
                <li>Proof of purchase (receipts).</li>
                <li>Drawings.</li>
                <li>Certificates.</li>
                <li>Photos.</li>
            </ul>
            <ButtonWrapper>
                <Button variant="black" onClick={handleClick}>
                    NEXT
                </Button>
            </ButtonWrapper>
        </FormContainer>
    );
};

export default Upload;
