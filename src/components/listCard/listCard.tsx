import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CancelButton, SubmitButton } from '../../pages/list/styles.ts'
import { List } from '../../services/apiTypes'
import { useDeleteList } from '../../services/hooks/List/useDeleteList.tsx'
import { ListWrapper, StyledDeleteIcon, StyledTitle } from './styles'

type Props = {
    part: List
}

const ListCard = ({ part }: Props) => {
    const navigate = useNavigate()
    const { mutate, isSuccess } = useDeleteList()
    const [open, setOpen] = useState(false)

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        setOpen(true)
        mutate(part.id)
        handleClose()
    }

    return (
        <>
            <ListWrapper onClick={() => navigate(`${part.id}`)}>
                <div onClick={(e) => handleOpen(e)}>
                    <StyledDeleteIcon style={{ fontSize: '30px' }}></StyledDeleteIcon>
                </div>
                <StyledTitle>{part.title}</StyledTitle>
                {part.updatedDate ? (
                    <h4>
                        Last updated:{' '}
                        {format(new Date(part.updatedDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                ) : (
                    <h4>
                        Created:{' '}
                        {format(new Date(part.createdDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                )}
            </ListWrapper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete list?</DialogTitle>
                <DialogActions>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleDelete}>Confirm</SubmitButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ListCard
