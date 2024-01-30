import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../Button/Button.tsx';
import { Container, Wrapper } from './styles';
import File from '../../File/File.tsx';

const AddPartUploadMobile = () => {
    const { register, setValue } = useFormContext();
    const [files, setFiles] = useState<File[]>();
    const documentationField = register('files');
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showArrow, setShowArrow] = useState(true);

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files!];
        filesCopy.splice(index, 1);
        setFiles(filesCopy);
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
        setValue('files', files);
        const fileClass = document.getElementsByClassName('fileClass');
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
            <Container>
                <Button variant="white" onClick={() => inputFile.current?.click()}>
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
                </Button>
            </Container>
        </>
    );
};

export default AddPartUploadMobile;
