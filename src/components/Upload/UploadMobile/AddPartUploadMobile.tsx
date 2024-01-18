import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button as ActionButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../../../components/Button/Button.tsx';
import { COLORS } from '../../../style/GlobalStyles';
import {
    Container,
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileTypeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
    Wrapper,
} from './styles';

const AddPartUploadMobile = () => {
    const { register, setValue } = useFormContext();
    const [files, setFiles] = useState<File[]>();
    const documentationField = register('files');
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showArrow, setShowArrow] = useState(true);

    const handleFileDownload = (file: File) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `${file.name}`;
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.click();
    };

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
                    <StyledFileWrapper className="fileClass" key={index}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="121"
                            height="153"
                            viewBox="0 0 121 153"
                            fill="none"
                        >
                            <foreignObject width={121} height={153}>
                                <StyledFileShapeWrapper>
                                    <StyledFileTypeWrapper>
                                        <h3>.{file.type.split('/')[1].toUpperCase()}</h3>
                                    </StyledFileTypeWrapper>
                                    <StyledIconWrapper>
                                        <ActionButton
                                            sx={{ color: 'black' }}
                                            onClick={() => handleFileDownload(file)}
                                        >
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        </ActionButton>
                                        <ActionButton
                                            sx={{ color: 'black' }}
                                            onClick={() => handleFileRemoval(index)}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="large" />
                                        </ActionButton>
                                    </StyledIconWrapper>
                                </StyledFileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <StyledDocumentName>{file.name.split('.')[0]}</StyledDocumentName>
                    </StyledFileWrapper>
                ))}
                {showArrow === true && (files?.length ?? 0) > 2 && (
                    <ArrowCircleRightOutlinedIcon
                        fontSize="large"
                        sx={{ position: 'sticky', top: '75px', right: '-10px' }}
                    />
                )}
            </Wrapper>
            <Container>
                <Button
                    color={`${COLORS.primary}`}
                    backgroundColor={COLORS.secondary}
                    onClick={() => inputFile.current?.click()}
                >
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
