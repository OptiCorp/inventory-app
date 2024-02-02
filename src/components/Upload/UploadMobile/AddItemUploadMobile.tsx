import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Wrapper } from './styles';
import File from '../../File/File.tsx';
import { Box } from '@mui/material';
import { Button as SubmitButton } from '../../Button/Button';

const AddItemUploadMobile = () => {
    const { setValue, getValues } = useFormContext();
    const [files, setFiles] = useState<File[]>();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showArrow, setShowArrow] = useState(true);

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

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.className = 'visible';
            } else {
                entry.target.className = 'hidden';
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.5,
    });

    useEffect(() => {
        const fileClass = document.getElementsByClassName('files');
        if (fileClass.length !== 0) {
            for (const element of fileClass) {
                observer.observe(element);
            }
        }
        return () => {
            if (fileClass.length !== 0) {
                for (const element of fileClass) {
                    observer.observe(element);
                }
            }
        };
    }, [files]);

    return (
        <>
            <Wrapper onTouchMove={() => setShowArrow(false)}>
                {files?.map((file, index) => (
                    <File
                        key={index}
                        file={file}
                        handleFileRemoval={() => handleFileRemoval(index)}
                    />
                ))}
                {showArrow === true && (files?.length ?? 0) > 2 && (
                    <ArrowCircleRightOutlinedIcon
                        fontSize="large"
                        sx={{ position: 'sticky', top: '75px', right: '-10px' }}
                    />
                )}
            </Wrapper>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
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
        </>
    );
};
export default AddItemUploadMobile;
