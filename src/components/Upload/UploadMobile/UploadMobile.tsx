import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    List,
    ListItem,
    Button,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AddDocument } from '../../../services/apiTypes';
import { useDeleteDocument } from '../../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../../services/hooks/documents/useGetDocumentsByItemId';
import { Container, Wrapper } from './styles';
import { Button as SubmitButton } from '../../Button/Button';
import { useUploadDocumentToItem } from '../../../services/hooks/documents/useUploadDocumentToItem';
import { useGetDocumentTypes } from '../../../services/hooks/documents/useGetDocumentTypes';
import File from '../../File/File';

type UploadProps = {
    itemId: string;
};

const UploadMobile = ({ itemId }: UploadProps) => {
    const { data: documents } = useGetDocumentsByItemId(itemId);
    const { data: documentTypes } = useGetDocumentTypes();
    const { mutate: uploadDocumentToItem } = useUploadDocumentToItem();
    const { mutate: deleteDocument } = useDeleteDocument(itemId);
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [showArrow, setShowArrow] = useState(true);
    const [openDocumentTypeDialog, setOpenDocumentTypeDialog] = useState(false);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = () => {
        setOpenDocumentTypeDialog(false);
        if (file) {
            const document: AddDocument = {
                file: file,
                documentTypeId: chosenDocumentType!,
            };
            uploadDocumentToItem({ document, itemId });
        }
        setFile(null);
        setChosenDocumentType(null);
    };

    const handleFileDelete = (documentId: string) => {
        deleteDocument(documentId);
    };

    const handleCancel = () => {
        setOpenDocumentTypeDialog(false);
        setFile(null);
        setChosenDocumentType(null);
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
        const files = document.getElementsByClassName('files');
        if (files.length !== 0) {
            for (const element of files) {
                observer.observe(element);
            }
            if (files.length > 2) {
                setShowArrow(true);
            }
        }

        return () => {
            if (files.length !== 0) {
                for (const element of files) {
                    observer.observe(element);
                }
            }
        };
    }, [documents]);

    return (
        <>
            <Dialog open={openDocumentTypeDialog}>
                <DialogTitle>What kind of document is this?</DialogTitle>
                <DialogContent>
                    <RadioGroup onChange={(e) => setChosenDocumentType(e.target.value)}>
                        <List>
                            {documentTypes?.map((type) => (
                                <ListItem key={type.id}>
                                    <FormControlLabel
                                        value={type.id}
                                        control={<Radio />}
                                        label={type.name}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </RadioGroup>
                    <div
                        style={{ display: 'flex', justifyContent: 'space-between', margin: '8px' }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleCancel}
                            sx={{
                                color: '#000000',
                                backgroundColor: '#ffffff',
                                border: '1px solid black',
                                borderRadius: '0',
                            }}
                            startIcon={<CloseIcon />}
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleFileUpload}
                            sx={{ color: '#ffffff', backgroundColor: '#000000', borderRadius: '0' }}
                            startIcon={<FileUploadIcon />}
                        >
                            UPLOAD
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <Wrapper onTouchMove={() => setShowArrow(false)}>
                {documents?.map((document) => (
                    <File
                        key={document.id}
                        doc={document}
                        handleFileRemoval={() => handleFileDelete(document.id)}
                    />
                ))}
                {showArrow === true && (documents?.length ?? 0) > 2 && (
                    <ArrowCircleRightOutlinedIcon
                        fontSize="large"
                        sx={{ position: 'sticky', top: '75px', right: '-10px' }}
                    />
                )}
            </Wrapper>
            <Container>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    <input
                        type="file"
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setFile([...e.target.files!][0]);
                            setOpenDocumentTypeDialog(true);
                        }}
                        ref={inputFile}
                    />
                    ADD DOCUMENT
                </SubmitButton>
            </Container>
        </>
    );
};
export default UploadMobile;
