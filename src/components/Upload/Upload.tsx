import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
    Box,
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
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes';
import { useGetDocumentsByItemId } from '../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocumentToItem } from '../../services/hooks/documents/useUploadDocumentToItem';
import { COLORS } from '../../style/GlobalStyles';
import { File } from '../File/File';
import { CustomDialog } from '../CustomDialog/CustomDialog';

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
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [documentIdToDelete, setDocumentIdToDelete] = useState('');
    const [documentNameToDelete, setDocumentNameToDelete] = useState('');
    const handleFileUpload = () => {
        setOpenDocumentTypeDialog(false);
        if (file) {
            const document: AddDocument = {
                file: file,
                documentTypeId: chosenDocumentType!,
            };
            uploadDocumentToItem({ document: document, itemId: itemId });
        }
        setFile(null);
        setChosenDocumentType(null);
    };

    const handleCancel = () => {
        setOpenDocumentTypeDialog(false);
        setFile(null);
        setChosenDocumentType(null);
    };

    const handleClose = () => {
        setIsDeleteConfirmationOpen(false);
        setDocumentNameToDelete('');
    };

    const handleFileDeleteConfirmation = (documentId: string, documentName?: string) => {
        setDocumentIdToDelete(documentId);
        if (documentName) {
            setDocumentNameToDelete(documentName);
        }
        setIsDeleteConfirmationOpen(true);
    };

    const handleFileToDelete = () => {
        if (documentIdToDelete) {
            deleteDocument(documentIdToDelete);
        }
        setIsDeleteConfirmationOpen(false);
    };

    return (
        <Box sx={{ margin: '8px 0' }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
                    </Box>
                </DialogContent>
            </Dialog>
            <CustomDialog
                open={isDeleteConfirmationOpen}
                SubmitButtonOnClick={handleFileToDelete}
                CancelButtonOnClick={handleClose}
                onClose={handleClose}
                isWarning
                title="Delete upload"
            >
                Are you sure you want to permanently delete &quot;
                {documentNameToDelete ? documentNameToDelete : 'No fil name'}
                &quot;?
            </CustomDialog>

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
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    documents?.map((document) => {
                        return (
                            <File
                                key={document.id}
                                doc={document}
                                handleFileRemoval={() =>
                                    handleFileDeleteConfirmation(document.id, document?.fileName)
                                }
                            />
                        );
                    })
                )}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    variant="outlined"
                    onClick={() => inputFile.current?.click()}
                    sx={{ borderRadius: '0', height: '40px', width: '200px' }}
                >
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
                    Add document
                </Button>
            </Box>
        </Box>
    );
};
