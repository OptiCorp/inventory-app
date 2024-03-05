import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    Radio,
    RadioGroup,
} from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { COLORS } from '../../style/GlobalStyles';
import { Button as SubmitButton } from '../Button/Button';
import { File } from '../File/File';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useGetDocumentTypes } from '../../services/hooks/documents/useGetDocumentTypes.ts';

export const AddItemUpload = () => {
    const { setValue, getValues } = useFormContext();
    const [files, setFiles] = useState<File[]>();
    const inputFile = useRef<HTMLInputElement | null>(null);
    const [openDocumentTypeDialog, setOpenDocumentTypeDialog] = useState(false);
    const [fileDocumentTypes, setFileDocumentTypes] = useState<string[]>([]);
    const [chosenDocumentType, setChosenDocumentType] = useState<string | null>(null);
    const [uploadToTemplateCheckbox, setUploadToTemplateCheckbox] = useState<boolean>(false);
    const [uploadToTemplate, setUploadToTemplate] = useState<boolean[]>([]);
    const { data: documentTypes } = useGetDocumentTypes();

    const handleFileRemoval = (index: number) => {
        const filesCopy = [...files!];
        filesCopy.splice(index, 1);
        setValue('files', filesCopy);
        setFiles(filesCopy);
    };

    const handleTypeRemoval = (index: number) => {
        const fileDocumentTypesCopy = [...fileDocumentTypes];
        fileDocumentTypesCopy.splice(index, 1);
        setValue('documentTypes', fileDocumentTypesCopy);
        setFileDocumentTypes(fileDocumentTypesCopy);

        const uploadToTemplateCopy = [...uploadToTemplate];
        uploadToTemplateCopy.splice(index, 1);
        setValue('uploadToTemplate', uploadToTemplateCopy);
        setUploadToTemplate(uploadToTemplateCopy);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files: File[] = getValues('files') as File[];
        setValue('files', files ? files.concat([...e.target.files!]) : [...e.target.files!]);
        setFiles(getValues('files') as File[]);
    };

    const handleDocumentTypeUpload = () => {
        const filesDocumentTypes: string[] = getValues('documentTypes') as string[];
        setValue(
            'documentTypes',
            filesDocumentTypes
                ? filesDocumentTypes.concat([chosenDocumentType!])
                : [chosenDocumentType]
        );
        setFileDocumentTypes(getValues('documentTypes') as string[]);

        const uploadToTemplateValues: boolean[] = getValues('uploadToTemplate') as boolean[];
        setValue(
            'uploadToTemplate',
            uploadToTemplateValues
                ? uploadToTemplateValues.concat([uploadToTemplateCheckbox])
                : [uploadToTemplateCheckbox]
        );
        setUploadToTemplate(getValues('uploadToTemplate') as boolean[]);

        setOpenDocumentTypeDialog(false);
        setChosenDocumentType(null);
        setUploadToTemplateCheckbox(false);
    };

    const handleCancel = () => {
        setOpenDocumentTypeDialog(false);
        setChosenDocumentType(null);
        handleFileRemoval(files!.length - 1);
        if (files!.length > fileDocumentTypes.length) {
            handleTypeRemoval(fileDocumentTypes.length - 1);
        }
        setUploadToTemplateCheckbox(false);
    };

    return (
        <div>
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
                    <FormGroup sx={{ marginLeft: 4, marginBottom: 2, marginTop: 4 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={uploadToTemplateCheckbox}
                                    onClick={() =>
                                        setUploadToTemplateCheckbox(!uploadToTemplateCheckbox)
                                    }
                                />
                            }
                            label="Upload to template?"
                        />
                    </FormGroup>
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
                            disabled={!chosenDocumentType}
                            onClick={handleDocumentTypeUpload}
                            sx={{ color: '#ffffff', backgroundColor: '#000000', borderRadius: '0' }}
                            startIcon={<FileUploadIcon />}
                        >
                            UPLOAD
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

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
                            handleFileRemoval={() => {
                                handleFileRemoval(index);
                                handleTypeRemoval(index);
                            }}
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
                            onChange={(e) => {
                                handleFileUpload(e);
                                setOpenDocumentTypeDialog(true);
                            }}
                            ref={inputFile}
                        />
                        UPLOAD NEW
                    </SubmitButton>
                </Box>
            </Box>
        </div>
    );
};
