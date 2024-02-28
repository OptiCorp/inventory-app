import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TextField, Typography } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import {
    Category,
    DocumentType,
    Location,
    UpdateCategory,
    UpdateLocation,
    UpdateVendor,
    Vendor,
} from '../../services/apiTypes';
import { useDeleteCategory } from '../../services/hooks/category/useDeleteCategory';
import { useUpdateCategory } from '../../services/hooks/category/useUpdateCategory';
import { useDeleteLocation } from '../../services/hooks/locations/useDeleteLocation';
import { useUpdateLocation } from '../../services/hooks/locations/useUpdateLocation';
import { useDeleteVendor } from '../../services/hooks/vendor/useDeleteVendor';
import { useUpdateVendor } from '../../services/hooks/vendor/useUpdateVendor';
import { SearchType } from '../../utils/constant';
import { StyledAdminActions, StyledAdminSearchCardContainer, StyledTitleContainer } from './styles';
import { CustomDialog } from '../CustomDialog/CustomDialog';
import AppContext from '../../contexts/AppContext';
import { handleApiRequestSnackbar } from '../../utils/handleApiRequestSnackbar';
import { COLORS } from '../../style/GlobalStyles';
import { useDeleteDocumentType } from '../../services/hooks/documents/useDeleteDocumentType';
import { useUpdateDocumentType } from '../../services/hooks/documents/useUpdateDocumentType';
import styled from 'styled-components';
import { FormProvider, useController, useForm } from 'react-hook-form';
type DataUnion = Category | Vendor | Location | DocumentType;
type Props = {
    data: DataUnion;
    searchType: SearchType;
};

export const AdminSearchCard = ({ data, searchType }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const methods = useForm();
    console.log(methods.watch());
    const {
        field: {
            value: descriptionValue,
            onChange: descriptionOnChange,
            onBlur: descriptionOnBlur,
        },
    } = useController({
        control: methods.control,
        name: 'description',
    });
    const {
        field: { value: nameValue, onChange: nameOnChange, onBlur: nameOnBlur },
    } = useController({
        control: methods.control,
        name: 'name',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [clickedElement, setClickedElement] = useState<typeof data.name | null>(null);
    console.log('data id', data.id);
    const { mutate: updateCategory } = useUpdateCategory(data.id);
    const { mutate: updateVendor } = useUpdateVendor(data.id);
    const { mutate: updateLocation } = useUpdateLocation(data.id);
    const { mutate: updateDocumentType } = useUpdateDocumentType(data.id);
    const { mutate: deleteCategory } = useDeleteCategory(data.id);
    const { mutate: deleteVendor } = useDeleteVendor(data.id);
    const { mutate: deleteLocation } = useDeleteLocation(data.id);
    const { mutate: deleteDocumentType } = useDeleteDocumentType(data.id);

    function isDocumentType(data: DataUnion): data is DocumentType {
        return (data as DocumentType).description !== undefined;
    }

    const handleEdit = (
        isEditing: boolean,
        nameEvent?: FormEvent<HTMLInputElement>,
        descriptionEvent?: FormEvent<HTMLInputElement>
    ) => {
        if (isEditing) {
            if (nameEvent) {
                switch (searchType) {
                    case SearchType.Category: {
                        data.name = nameEvent?.currentTarget.value;
                        const newCategory: UpdateCategory = {
                            id: data.id,
                            name: nameEvent?.currentTarget.value,
                        };
                        updateCategory(newCategory);
                        break;
                    }
                    case SearchType.Vendor: {
                        data.name = nameEvent?.currentTarget.value;
                        const newVendor: UpdateVendor = {
                            id: data.id,
                            name: nameEvent?.currentTarget.value,
                        };
                        updateVendor(newVendor);
                        break;
                    }
                    case SearchType.Location: {
                        data.name = nameEvent?.currentTarget.value;
                        const newLocation: UpdateLocation = {
                            id: data.id,
                            name: nameEvent?.currentTarget.value,
                        };
                        updateLocation(newLocation);
                        break;
                    }
                    case SearchType.DocumentType: {
                        console.log(nameEvent.currentTarget.value);
                        data.description = descriptionEvent?.currentTarget.value;
                        const newDocumentType: DocumentType = {
                            ...data,
                            id: data.id,
                            name: nameValue ? nameValue : nameEvent.currentTarget.value,
                            description: descriptionValue ? descriptionValue : data.description,
                        };
                        updateDocumentType(newDocumentType);
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
                            `Category: ${clickedElement} deleted`,
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
                            `Vendor: ${clickedElement} deleted`,
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
                            `Location: ${clickedElement} deleted`,
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
                            `Document type: ${clickedElement} deleted`,
                            setSnackbarSeverity,
                            setSnackbarText
                        );
                    },
                });
        }
    };

    const handleSelected = () => {
        setClickedElement(data.name);
        setIsOpen(true);
    };

    return (
        <FormProvider {...methods}>
            <StyledAdminSearchCardContainer>
                <StyledTitleContainer>
                    {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                type="text"
                                placeholder={data.name}
                                defaultValue={data.name}
                                style={{ fontSize: '20px', width: '150px' }}
                                value={nameValue}
                                onBlur={nameOnBlur}
                                onChange={nameOnChange}
                                /* onBlur={() => onBlur()} */
                            />
                            {isDocumentType(data) && (
                                <input
                                    type="text"
                                    style={{ fontSize: '20px', width: '150px' }}
                                    value={descriptionValue}
                                    /* onBlur={(e) => handleEdit(isEditing, e)} */
                                    onBlur={descriptionOnBlur}
                                    onChange={descriptionOnChange}
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h5" fontWeight={'bold'}>
                                {data.name}
                            </Typography>
                            <StyledEllipsisContainer>
                                {isDocumentType(data) && (
                                    <Typography
                                        variant="caption"
                                        color={COLORS.black}
                                        fontSize={'1rem'}
                                        noWrap
                                    >
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
                        onClick={() => handleEdit(isEditing)}
                    >
                        {isEditing ? (
                            <DoneIcon sx={{ fontSize: 36 }} />
                        ) : (
                            <EditIcon sx={{ fontSize: 36 }} />
                        )}
                    </Button>
                    <Button
                        onClick={() => handleSelected()}
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

const StyledEllipsisContainer = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        width: 500px;
    }

    @media screen and (max-width: 700px) {
        width: 400px;
    }

    @media screen and (max-width: 570px) {
        width: 250px;
    }

    @media screen and (max-width: 400px) {
        width: 200px;
    }
`;
