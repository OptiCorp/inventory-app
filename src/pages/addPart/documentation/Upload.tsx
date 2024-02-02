import { useController, useFormContext } from 'react-hook-form';
import AddPartUpload from '../../../components/Upload/AddPartUpload.tsx';
import AddPartUploadMobile from '../../../components/Upload/UploadMobile/AddPartUploadMobile.tsx';

import { useWindowDimensions } from '../../../hooks/useWindowDimensions.ts';
import { RadioWrapper, StyledInput } from '../batch/styles.ts';
import { PartSchema } from '../hooks/partValidator.ts';
import { FormContainer } from '../styles.ts';

const Upload = () => {
    const { width } = useWindowDimensions();

    const { control } = useFormContext<PartSchema>();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name: 'documentation',
    });

    return (
        <FormContainer>
            <h3 style={{ marginBottom: '0' }}>Upload documentation</h3>
            <p>Add relevant documentation below. </p>
            <ul style={{ marginLeft: '-25px' }}>
                <li> Accepted formats: PDF, DOCX and JPG. </li>
                <li> Maximum file size: 20MB </li>
            </ul>{' '}
            {width > 500 ? <AddPartUpload /> : <AddPartUploadMobile />}
            <span style={{ color: 'red' }}>{error?.message}</span>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={value}
                        type="checkbox"
                        name="checks"
                        onChange={() => onChange(!value)}
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
        </FormContainer>
    );
};

export default Upload;
