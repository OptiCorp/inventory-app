import { Category, DocumentType, Location, Vendor } from '../../services/apiTypes';
import { SearchType } from '../../utils/constant';
import { FormProvider } from 'react-hook-form';
import { useUpdateAdminForm } from './useUpdateAdminForm';
import { Button, Typography } from '@mui/material';
import { useUpdateDocumentType } from '../../services/hooks/documents/useUpdateDocumentType';
import { useContext, useState } from 'react';
import {
    StyledAdminActions,
    StyledAdminSearchCardContainer,
    StyledEllipsisContainer,
    StyledInputContainer,
    StyledTitleContainer,
} from './styles';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteDocumentType } from '../../services/hooks/documents/useDeleteDocumentType';
import { handleApiRequestSnackbar } from '../../utils/handleApiRequestSnackbar';
import AppContext from '../../contexts/AppContext';
import { CustomDialog } from '../CustomDialog/CustomDialog';
import { useUpdateLocation } from '../../services/hooks/locations/useUpdateLocation';
import { useUpdateVendor } from '../../services/hooks/vendor/useUpdateVendor';
import { useUpdateCategory } from '../../services/hooks/category/useUpdateCategory';
import { useDeleteCategory } from '../../services/hooks/category/useDeleteCategory';
import { useDeleteVendor } from '../../services/hooks/vendor/useDeleteVendor';
import { useDeleteLocation } from '../../services/hooks/locations/useDeleteLocation';
import { FormInput } from '../FormInput';
import { useFieldNameController } from '../../hooks/useFieldNameController';

type DataUnion = Category | Vendor | Location | DocumentType;
type Props = {
    data: DataUnion;
    searchType: SearchType;
};

export const AdminSearchCard = ({ data, searchType }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const {
        methods,
        control,
        formState: { isDirty },
    } = useUpdateAdminForm();
    const { mutate: updateCategory } = useUpdateCategory(data.id);
    const { mutate: updateVendor } = useUpdateVendor(data.id);
    const { mutate: updateLocation } = useUpdateLocation(data.id);
    const { mutate: updateDocumentType } = useUpdateDocumentType(data.id);
    const { mutate: deleteCategory } = useDeleteCategory(data.id);
    const { mutate: deleteVendor } = useDeleteVendor(data.id);
    const { mutate: deleteLocation } = useDeleteLocation(data.id);
    const { mutate: deleteDocumentType } = useDeleteDocumentType(data.id);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clickedElement, setClickedElement] = useState<typeof data.name | null>(null);
    const { onChange: nameOnChange, value: nameValue } = useFieldNameController('name', control);
    const { onChange: descriptionOnChange, value: descriptionValue } = useFieldNameController(
        'description',
        control
    );

    const isDocumentType = (data: DataUnion): data is DocumentType => {
        return (data as DocumentType).description !== undefined;
    };

    const handleEdit = (isEditing: boolean) => {
        const updateObject = {
            ...data,
            id: data.id,
            name: nameValue ? nameValue : data.name,
        };
        if (isEditing) {
            if (isDirty) {
                switch (searchType) {
                    case SearchType.Category: {
                        updateCategory(updateObject, {
                            onSuccess: (data) => {
                                handleApiRequestSnackbar(
                                    data,
                                    `Updated category: ${clickedElement}`,
                                    setSnackbarSeverity,
                                    setSnackbarText
                                );
                            },
                        });
                        break;
                    }
                    case SearchType.Vendor: {
                        updateVendor(updateObject, {
                            onSuccess: (data) => {
                                handleApiRequestSnackbar(
                                    data,
                                    `Updated vendor: ${clickedElement}`,
                                    setSnackbarSeverity,
                                    setSnackbarText
                                );
                            },
                        });
                        break;
                    }
                    case SearchType.Location: {
                        updateLocation(updateObject, {
                            onSuccess: (data) => {
                                handleApiRequestSnackbar(
                                    data,
                                    `Updated location: ${clickedElement}`,
                                    setSnackbarSeverity,
                                    setSnackbarText
                                );
                            },
                        });
                        break;
                    }
                    case SearchType.DocumentType: {
                        if (isDocumentType(data)) {
                            const documentTypeUpdateObject = {
                                ...updateObject,
                                description: descriptionValue ? descriptionValue : data.description,
                            };

                            updateDocumentType(documentTypeUpdateObject, {
                                onSuccess: (data) => {
                                    handleApiRequestSnackbar(
                                        data,
                                        `Document type: ${clickedElement} updated`,
                                        setSnackbarSeverity,
                                        setSnackbarText
                                    );
                                },
                            });
                        }
                    }
                }
            }
            setIsEditing(!isEditing);
        } else {
            setIsEditing(!isEditing);
        }
    };

    const handleDelete = () => {
        switch (searchType) {
            case SearchType.Category:
                deleteCategory(undefined, {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            `Deleted category: ${clickedElement}`,
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                });
                break;
            case SearchType.Vendor:
                deleteVendor(undefined, {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            `Deleted vendor: ${clickedElement}`,
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                });
                break;
            case SearchType.Location:
                deleteLocation(undefined, {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            `Deleted location: ${clickedElement}`,
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                });
                break;
            case SearchType.DocumentType:
                deleteDocumentType(undefined, {
                    onSuccess: (data) => {
                        handleApiRequestSnackbar(
                            data,
                            `Deleted document type: ${clickedElement}`,
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                });
        }
    };

    const handleSelected = (isDeleting = false) => {
        setClickedElement(data.name);
        if (isDeleting) {
            setIsOpen(true);
        }
    };

    return (
        <FormProvider {...methods}>
            <StyledAdminSearchCardContainer>
                <StyledTitleContainer>
                    {isEditing && (
                        <StyledInputContainer>
                            <FormInput
                                variant="outlined"
                                value={nameValue ? nameValue : data.name}
                                onChange={(newValue) => nameOnChange(newValue)}
                            />
                            {isDocumentType(data) && (
                                <FormInput
                                    value={descriptionValue ? descriptionValue : data.description}
                                    onChange={(newValue) => {
                                        descriptionOnChange(newValue);
                                    }}
                                    isMultiLine
                                />
                            )}
                        </StyledInputContainer>
                    )}
                    {!isEditing && (
                        <div>
                            <Typography variant="h5" fontWeight={'bold'}>
                                {data.name}
                            </Typography>
                            <StyledEllipsisContainer>
                                {isDocumentType(data) && (
                                    <Typography variant="caption" fontSize={'1rem'} noWrap>
                                        {data.description}
                                    </Typography>
                                )}
                            </StyledEllipsisContainer>
                        </div>
                    )}
                </StyledTitleContainer>
                <StyledAdminActions>
                    <Button
                        color={isEditing ? 'success' : 'primary'}
                        sx={{ color: 'black', margin: '0 4px' }}
                        onClick={() => {
                            handleSelected();
                            handleEdit(isEditing);
                        }}
                    >
                        {isEditing ? (
                            <DoneIcon sx={{ fontSize: 36 }} />
                        ) : (
                            <EditIcon sx={{ fontSize: 36 }} />
                        )}
                    </Button>
                    <Button
                        onClick={() => handleSelected(true)}
                        color="error"
                        sx={{ color: 'black', margin: '0 4px' }}
                    >
                        <DeleteIcon sx={{ fontSize: 36 }} />
                    </Button>
                </StyledAdminActions>
                <CustomDialog
                    title={`Delete ${clickedElement}?`}
                    SubmitButtonOnClick={() => {
                        handleDelete();
                        setIsOpen(false);
                    }}
                    CancelButtonOnClick={() => setIsOpen(false)}
                    isWarning
                    open={isOpen}
                    onClose={() => setIsOpen((prev) => !prev)}
                >
                    <div>
                        <p>
                            Are you sure you want to delete <strong>{clickedElement}</strong>?
                        </p>
                        <p>This will be permanently deleted.</p>
                    </div>
                </CustomDialog>
            </StyledAdminSearchCardContainer>
        </FormProvider>
    );
};
