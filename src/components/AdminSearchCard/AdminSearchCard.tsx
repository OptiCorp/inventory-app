import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { FormEvent, useState } from 'react';
import {
    Category,
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

type Props = {
    data: Category | Vendor | Location;
    searchType: SearchType;
};

const AdminSearchCard = ({ data, searchType }: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const { mutate: updateCategory } = useUpdateCategory(data.id);
    const { mutate: updateVendor } = useUpdateVendor(data.id);
    const { mutate: updateLocation } = useUpdateLocation(data.id);
    const { mutate: deleteCategory } = useDeleteCategory(data.id);
    const { mutate: deleteVendor } = useDeleteVendor(data.id);
    const { mutate: deleteLocation } = useDeleteLocation(data.id);

    const handleEdit = (isEditing: boolean, event?: FormEvent<HTMLInputElement>) => {
        if (isEditing) {
            if (event) {
                switch (searchType) {
                    case SearchType.Category: {
                        data.name = event?.currentTarget.value;
                        const newCategory: UpdateCategory = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        };
                        updateCategory(newCategory);
                        break;
                    }
                    case SearchType.Vendor: {
                        data.name = event?.currentTarget.value;
                        const newVendor: UpdateVendor = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        };
                        updateVendor(newVendor);
                        break;
                    }
                    case SearchType.Location: {
                        data.name = event?.currentTarget.value;
                        const newLocation: UpdateLocation = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        };
                        updateLocation(newLocation);
                        break;
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
                deleteCategory();
                break;
            case SearchType.Vendor:
                deleteVendor();
                break;
            case SearchType.Location:
                deleteLocation();
        }
    };

    return (
        <StyledAdminSearchCardContainer>
            <StyledTitleContainer>
                {isEditing ? (
                    <input
                        type="text"
                        placeholder={data.name}
                        style={{ fontSize: '20px', width: '150px' }}
                        onBlur={(e) => handleEdit(isEditing, e)}
                    />
                ) : (
                    <h2>{data.name}</h2>
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
                    onClick={() => handleDelete()}
                    color="error"
                    sx={{ color: 'black', margin: '0 4px' }}
                >
                    <DeleteIcon sx={{ fontSize: 36 }} />
                </Button>
            </StyledAdminActions>
        </StyledAdminSearchCardContainer>
    );
};

export default AdminSearchCard;
