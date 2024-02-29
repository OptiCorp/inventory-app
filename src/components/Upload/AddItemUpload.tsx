import { Box } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { COLORS } from '../../style/GlobalStyles';
import { Button as SubmitButton } from '../Button/Button';
import { File } from '../File/File';

export const AddItemUpload = () => {
    const { setValue, getValues } = useFormContext();
    const [files, setFiles] = useState<File[]>();
    const inputFile = useRef<HTMLInputElement | null>(null);

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files!];
        filesCopy.splice(index, 1);
        setValue('files', filesCopy);
        setFiles(filesCopy);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files: File[] = getValues('files') as File[];
        setValue('files', files ? files.concat([...e.target.files!]) : [...e.target.files!]);
        setFiles(getValues('files') as File[]);
    };
    return (
        <Box sx={{ margin: '8px 0' }}>
            <Box
                sx={{
                    display: 'flex',
                    padding: '12px 20px',
                    margin: '8px 0',
                    border: `1px dashed ${COLORS.black}`,
                    boxSizing: 'border-box',
                    minHeight: '200px',
                }}
            >
                {files?.map((file, index) => (
                    <File
                        key={index}
                        file={file}
                        handleFileRemoval={() => handleFileRemoval(index)}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <SubmitButton
                    variant="white"
                    type="button"
                    onClick={() => inputFile.current?.click()}
                >
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        ref={inputFile}
                    />
                    UPLOAD NEW
                </SubmitButton>
            </Box>
        </Box>
    );
};
