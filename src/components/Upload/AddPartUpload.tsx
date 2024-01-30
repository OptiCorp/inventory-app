import { Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button as SubmitButton } from '../Button/Button';
import { Wrapper } from './styles';
import File from '../File/File';

const AddPartUpload = () => {
    const { register, setValue } = useFormContext();
    const [files, setFiles] = useState<File[]>();

    const documentationField = register('files');
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files!];
        filesCopy.splice(index, 1);
        setFiles(filesCopy);
    };

    useEffect(() => {
        setValue('files', files);
    }, [files]);

    return (
        <>
            <Wrapper>
                {files?.map((file, index) => (
                    <File file={file} handleFileRemoval={() => handleFileRemoval(index)} />
                ))}
            </Wrapper>
            <Container>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        {...documentationField}
                        onChange={(e) => {
                            setFiles([...e.target.files!]);
                        }}
                        ref={(e) => {
                            documentationField.ref(e);
                            inputFile.current = e;
                        }}
                    />
                    UPLOAD NEW
                </SubmitButton>
            </Container>
        </>
    );
};

export default AddPartUpload;
