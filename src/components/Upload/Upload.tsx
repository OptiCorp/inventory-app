import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Radio,
    RadioGroup,
} from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { AddDocument, Document, Item } from '../../services/apiTypes';
import { useDeleteDocument } from '../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocumentToItem } from '../../services/hooks/documents/useUploadDocumentToItem';
import { Button as SubmitButton } from '../Button/Button';
import {
    Container,
    StyledDocumentName,
    StyledFileShapeWrapper,
    StyledFileWrapper,
    StyledIconWrapper,
    StyledTypeWrapper,
    Wrapper,
} from './styles';
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes';

type UploadProps = {
    itemId: string;
};

export const ExampleUpload = ({ itemId }: UploadProps) => {
    const { data: documents } = useGetDocumentsByItemId(itemId);
    const { mutate: uploadDocumentToItem } = useUploadDocumentToItem();
    const { mutate: deleteDocument } = useDeleteDocument(itemId);
    const { data: documentTypes } = useGetDocumentTypes();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [openDocumentTypeDialog, setOpenDocumentTypeDialog] = useState(false);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleFileUpload = async () => {
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

    const handleFileDownload = (file: Document) => {
        const downloadLink = document.createElement('a');
        downloadLink.download = `${file.name}`;
        downloadLink.href = `data:${file.contentType};base64,${file.bytes}`;
        downloadLink.click();
    };

    const handleFileDelete = (documentId: string) => {
        deleteDocument(documentId);
    };

    return (
        <>
            <Dialog open={openDocumentTypeDialog}>
                <DialogTitle>What kind of document is this?</DialogTitle>
                <DialogContent>
                    <RadioGroup onChange={(e) => setChosenDocumentType(e.target.value)} row={false}>
                        <List>
                            {documentTypes?.map((type) => (
                                <ListItem>
                                    <FormControlLabel
                                        value={type.id}
                                        control={<Radio />}
                                        label={type.name}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </RadioGroup>
                </DialogContent>

                <Button onClick={handleFileUpload} color="error" startIcon={<FileUploadIcon />}>
                    UPLOAD FILE
                </Button>
            </Dialog>

            <Wrapper>
                {documents?.map((document) => (
                    <StyledFileWrapper key={document.id}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="121"
                            height="153"
                            viewBox="0 0 121 153"
                            fill="none"
                        >
                            <foreignObject width={121} height={153}>
                                <StyledFileShapeWrapper>
                                    <StyledTypeWrapper>
                                        <h3>.{document.contentType.split('/')[1].toUpperCase()}</h3>
                                    </StyledTypeWrapper>
                                    <StyledIconWrapper>
                                        <Button
                                            onClick={() => handleFileDownload(document)}
                                            sx={{ color: 'black' }}
                                        >
                                            <FileDownloadOutlinedIcon fontSize="large" />
                                        </Button>
                                        <Button
                                            onClick={() => handleFileDelete(document.id)}
                                            sx={{ color: 'black' }}
                                        >
                                            <DeleteOutlineOutlinedIcon fontSize="large" />
                                        </Button>
                                    </StyledIconWrapper>
                                </StyledFileShapeWrapper>
                            </foreignObject>
                            <path
                                d="M95 1H1V152H120V21.1333M95 1L120 21.1333M95 1V21.1333H120"
                                stroke="black"
                            />
                        </svg>
                        <StyledDocumentName>{document.name.split('.')[0]}</StyledDocumentName>
                    </StyledFileWrapper>
                ))}
            </Wrapper>
            <Container>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    {' '}
                    <input
                        type="file"
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            const file = [...e.target.files!][0];
                            setFile(file);
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
