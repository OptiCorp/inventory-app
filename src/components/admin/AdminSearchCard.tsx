import { Category, Location, Vendor } from '../../services/apiTypes'
import { AdminActions, AdminSearchCardContainer } from './styles'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material'

type Props = {
    data: Category | Vendor | Location
}

const AdminSearchCard = ({ data }: Props) => {
    return (
        <AdminSearchCardContainer>
            <div>
                <h3>{data.name}</h3>
            </div>
            <AdminActions>
                <Button variant="outlined" sx={{ color: 'black', margin: '0 4px' }}>
                    <EditIcon sx={{ fontSize: 36 }} />
                </Button>
                <Button variant="outlined" color="error" sx={{ color: 'black', margin: '0 4px' }}>
                    <DeleteIcon sx={{ fontSize: 36 }} />
                </Button>
            </AdminActions>
        </AdminSearchCardContainer>
    )
}

export default AdminSearchCard
