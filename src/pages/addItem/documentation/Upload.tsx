import { useController, useFormContext } from 'react-hook-form';
import { AddItemUpload } from '../../../components/Upload/AddItemUpload';
import { AddItemUploadMobile } from '../../../components/Upload/UploadMobile/AddItemUploadMobile';

import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { RadioWrapper, StyledInput } from '../batch/styles';
import { ItemSchema } from '../hooks/itemValidator';
import { FormContainer } from '../styles';

export const Upload = () => {
    const { width } = useWindowDimensions();

    const { control } = useFormContext<ItemSchema>();
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
            </ul>
            {width > 500 ? <AddItemUpload /> : <AddItemUploadMobile />}
            <span style={{ color: 'red' }}>{error?.message}</span>
            <label>
                <RadioWrapper>
                    <StyledInput
                        checked={value}
                        type="checkbox"
                        name="checks"
                        onChange={() => onChange(!value)}
                    />
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
