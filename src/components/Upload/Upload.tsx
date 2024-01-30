import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
} from '@mui/material';
import { useRef, useState } from 'react';
import { AddDocument } from '../../services/apiTypes';
import { useDeleteDocument } from '../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocumentToItem } from '../../services/hooks/documents/useUploadDocumentToItem';
import { Button as SubmitButton } from '../Button/Button';
import { Container, Wrapper } from './styles';
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes';
import File from '../File/File';

type UploadProps = {
    itemId: string;
};

export const ExampleUpload = ({ itemId }: UploadProps) => {
    const { data: documents, isLoading } = useGetDocumentsByItemId(itemId);
    const { mutate: uploadDocumentToItem } = useUploadDocumentToItem();
    const { mutate: deleteDocument } = useDeleteDocument(itemId);
    const { data: documentTypes } = useGetDocumentTypes();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [openDocumentTypeDialog, setOpenDocumentTypeDialog] = useState(false);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = () => {
        setOpenDocumentTypeDialog(false);
        if (file) {
            const document: AddDocument = {
                itemId: itemId,
                file: file,
                documentTypeId: chosenDocumentType!,
            };
            uploadDocumentToItem(document);
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
                            disabled={chosenDocumentType ? false : true}
                            onClick={handleFileUpload}
                            sx={{ color: '#ffffff', backgroundColor: '#000000', borderRadius: '0' }}
                            startIcon={<FileUploadIcon />}
                        >
                            UPLOAD
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Wrapper>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    documents?.map((document) => (
                        <File
                            key={document.id}
                            doc={document}
                            handleFileDelete={handleFileDelete}
                        />
                    ))
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
