import {
    Box,
    Button,
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
import { useFormContext } from 'react-hook-form';
import { COLORS } from '../../style/GlobalStyles';
import { Button as SubmitButton } from '../Button/Button';
import File from '../File/File';
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseIcon from '@mui/icons-material/Close';
import { AddDocument } from '../../services/apiTypes';

const AddItemUpload = () => {
    const { setValue } = useFormContext();
    const [file, setFile] = useState<File | null>();
    const [files, setFiles] = useState<AddDocument[]>([]);
    const inputFile = useRef<HTMLInputElement | null>(null);
    const { data: documentTypes } = useGetDocumentTypes();
    const [openDocumentTypeDialog, setOpenDocumentDialog] = useState<boolean>(false);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [addToTemplate, setAddToTemplate] = useState<boolean | null>(null);
    const [isOnFirstStep, setIsOnFirstStep] = useState<boolean>(true);

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files];
        filesCopy.splice(index, 1);
        setValue('files', filesCopy);
        setFiles(filesCopy);
    };

    const handleFileUpload = () => {
        // const files: File[] = getValues('files') as File[];
        // setValue('files', files ? files.concat([...e.target.files!]) : [...e.target.files!]);
        // setFiles(getValues('files') as File[]);

        setOpenDocumentDialog(false);
        if (file) {
            const document: AddDocument = {
                file: file,
                documentTypeId: chosenDocumentType!,
            };
            const copyOfFiles = [...files];
            copyOfFiles.push(document);
            setFiles(copyOfFiles);
            setValue('files', copyOfFiles);
        }
        setFile(null);
        setChosenDocumentType(null);
        setIsOnFirstStep(true);
        setAddToTemplate(null);
    };

    const handleCancel = () => {
        setOpenDocumentDialog(false);
        setChosenDocumentType(null);
        setIsOnFirstStep(true);
        setAddToTemplate(null);
    };

    return (
        <Box sx={{ margin: '8px 0' }}>
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
                {files?.map((file, index) => (
                    <File
                        key={index}
                        file={file.file}
                        handleFileRemoval={() => handleFileRemoval(index)}
                    />
                ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <SubmitButton variant="white" onClick={() => inputFile.current?.click()}>
                    <input
                        type="file"
                        accept=".pdf,.png,.docx,.jpg"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                            setFile([...e.target.files!][0]);
                            setOpenDocumentDialog(true);
                        }}
                        ref={inputFile}
                    />
                    UPLOAD NEW
                </SubmitButton>
            </Box>
        </Box>
    );
};
export default AddItemUpload;
