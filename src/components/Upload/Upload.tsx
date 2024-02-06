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
    Box,
} from '@mui/material';
import { useRef, useState } from 'react';
import { AddDocument } from '../../services/apiTypes';
import { useDeleteDocument } from '../../services/hooks/documents/useDeleteDocument';
import { useGetDocumentsByItemId } from '../../services/hooks/documents/useGetDocumentsByItemId';
import { useUploadDocumentToItem } from '../../services/hooks/documents/useUploadDocumentToItem';
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes';
import File from '../File/File';
import { COLORS } from '../../style/GlobalStyles';
import { useUploadDocumentToItemTemplate } from '../../services/hooks/documents/useUploadDocumentToItemTemplate';
import { CustomDialog } from '../CustomDialog/CustomDialog';

type UploadProps = {
    itemId: string;
    templateId: string;
};

export const ExampleUpload = ({ itemId, templateId }: UploadProps) => {
    const { data: documents, isLoading } = useGetDocumentsByItemId(itemId);
    const { mutate: uploadDocumentToItem } = useUploadDocumentToItem();
    const { mutate: uploadDocumentToItemTemplate } = useUploadDocumentToItemTemplate(
        templateId,
        itemId
    );
    const { mutate: deleteDocument } = useDeleteDocument(itemId);
    const { data: documentTypes } = useGetDocumentTypes();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [openDocumentTypeDialog, setOpenDocumentDialog] = useState<boolean>(false);
    const [openDocumentDeleteDialog, setOpenDocumentDeleteDialog] = useState<boolean>(false);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [addToTemplate, setAddToTemplate] = useState<boolean | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isOnFirstStep, setIsOnFirstStep] = useState<boolean>(true);
    const [documentToDelete, setDocumentToDelete] = useState<string>('');

    const handleFileUpload = () => {
        setOpenDocumentDialog(false);
        if (file) {
            const document: AddDocument = {
                file: file,
                documentTypeId: chosenDocumentType!,
            };
            if (addToTemplate) {
                uploadDocumentToItemTemplate(document);
            } else {
                uploadDocumentToItem({ document, itemId });
            }
        }
        setFile(null);
        setChosenDocumentType(null);
        setIsOnFirstStep(true);
        setAddToTemplate(null);
    };

    const handleFileDelete = () => {
        deleteDocument(documentToDelete);
        setOpenDocumentDeleteDialog(false);
    };

    const handleCancel = () => {
        setOpenDocumentDialog(false);
        setFile(null);
        setChosenDocumentType(null);
        setIsOnFirstStep(true);
        setAddToTemplate(null);
    };

    return (
        <Box sx={{ margin: '8px 0' }}>
            <CustomDialog
                title="Are you sure you want to delete?"
                submitButtonText="DELETE"
                cancelButtonText="CANCEL"
                CancelButtonOnClick={() => setOpenDocumentDeleteDialog(false)}
                open={openDocumentDeleteDialog}
                SubmitButtonOnClick={handleFileDelete}
            />
            <Dialog open={openDocumentTypeDialog}>
                <DialogTitle>
                    {isOnFirstStep ? (
                        <>What kind of document is this?</>
                    ) : (
                        <>
                            Would you like to add this <br />
                            document to the template?
                        </>
                    )}
                </DialogTitle>

                <DialogContent>
                    <RadioGroup
                        onChange={
                            isOnFirstStep
                                ? (e) => setChosenDocumentType(e.target.value)
                                : (e) =>
                                      setAddToTemplate(e.target.value === 'template' ? true : false)
                        }
                    >
                        <List>
                            {isOnFirstStep ? (
                                documentTypes?.map((type) => (
                                    <ListItem key={type.id}>
                                        <FormControlLabel
                                            value={type.id}
                                            control={<Radio />}
                                            label={type.name}
                                            checked={chosenDocumentType === type.id}
                                        />
                                    </ListItem>
                                ))
                            ) : (
                                <>
                                    <ListItem>
                                        <FormControlLabel
                                            value={'template'}
                                            control={<Radio />}
                                            label={'Yes'}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <FormControlLabel
                                            value={'item'}
                                            control={<Radio />}
                                            label={'No'}
                                        />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </RadioGroup>

                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button
                            variant="contained"
                            onClick={isOnFirstStep ? handleCancel : () => setIsOnFirstStep(true)}
                            sx={{
                                color: '#000000',
                                backgroundColor: '#ffffff',
                                border: '1px solid black',
                                borderRadius: '0',
                            }}
                            startIcon={isOnFirstStep && <CloseIcon />}
                        >
                            {isOnFirstStep ? 'CANCEL' : 'BACK'}
                        </Button>
                        <Button
                            variant="contained"
                            disabled={isOnFirstStep ? !chosenDocumentType : addToTemplate === null}
                            onClick={
                                isOnFirstStep ? () => setIsOnFirstStep(false) : handleFileUpload
                            }
                            sx={{
                                color: '#ffffff',
                                backgroundColor: '#000000',
                                borderRadius: '0',
                            }}
                            startIcon={!isOnFirstStep && <FileUploadIcon />}
                        >
                            {isOnFirstStep ? 'NEXT' : 'UPLOAD'}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

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
                    documents?.map((document) => (
                        <File
                            key={document.id}
                            doc={document}
                            handleFileRemoval={() => {
                                setDocumentToDelete(document.id);
                                setOpenDocumentDeleteDialog(true);
                            }}
                        />
                    ))
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
                            setOpenDocumentDialog(true);
                            e.target.files = null;
                        }}
                        ref={inputFile}
                    />
                    ADD DOCUMENT
                </Button>
            </Box>
        </Box>
    );
};
