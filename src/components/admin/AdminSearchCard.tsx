import {
    Category,
    Location,
    UpdateCategory,
    UpdateLocation,
    UpdateVendor,
    Vendor,
} from '../../services/apiTypes'
import { AdminActions, AdminSearchCardContainer } from './styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'
import { FormEvent, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import { useUpdateCategory } from '../../services/hooks/Category/useUpdateCategory'
import { useUpdateVendor } from '../../services/hooks/Vendor/useUpdateVendor'
import { useUpdateLocation } from '../../services/hooks/Locations/useUpdateLocation'

type Props = {
    data: Category | Vendor | Location
    adminType: string
}

export enum AdminType {
    Category = 'category',
    Vendor = 'vendor',
    Location = 'location',
}

const AdminSearchCard = ({ data, adminType }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    const { mutate: mutateCategory, status: categoryStatus } = useUpdateCategory(data.id)
    const { mutate: mutateVendor, status: vendorStatus } = useUpdateVendor(data.id)
    const { mutate: mutateLocation, status: locationStatus } = useUpdateLocation(data.id)

    const handleEdit = (isEditing: boolean, event?: FormEvent<HTMLInputElement>) => {
        if (isEditing) {
            if (event) {
                switch (adminType) {
                    case AdminType.Category:
                        data.name = event?.currentTarget.value
                        var newCategory: UpdateCategory = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        }
                        mutateCategory(newCategory)
                        break
                    case AdminType.Vendor:
                        data.name = event?.currentTarget.value
                        var newVendor: UpdateVendor = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        }
                        mutateVendor(newVendor)
                        break
                    case AdminType.Location:
                        data.name = event?.currentTarget.value
                        var newLocation: UpdateLocation = {
                            id: data.id,
                            name: event?.currentTarget.value,
                        }
                        mutateLocation(newLocation)
                        break
                }
            }
            setIsEditing(!isEditing)
        } else {
            setIsEditing(!isEditing)
        }
    }

    const handleDelete = () => {}

    return (
        <AdminSearchCardContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {isEditing ? (
                    <input
                        type="text"
                        placeholder={data.name}
                        style={{ fontSize: '20px' }}
                        onBlur={(e) => handleEdit(isEditing, e)}
                    />
                ) : (
                    <h2>{data.name}</h2>
                )}
            </div>
            <AdminActions>
                <Button
                    variant="outlined"
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
                <Button variant="outlined" color="error" sx={{ color: 'black', margin: '0 4px' }}>
                    <DeleteIcon sx={{ fontSize: 36 }} />
                </Button>
            </AdminActions>
        </AdminSearchCardContainer>
    )
}

export default AdminSearchCard
