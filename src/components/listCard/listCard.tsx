import { useNavigate } from 'react-router-dom'
import {ListWrapper, StyledTitle, StyledDeleteIcon} from './styles'
import { List } from '../../services/apiTypes'
import {useDeleteList} from "../../services/hooks/useDeleteList.tsx";
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {CancelButton, SubmitButton} from "../../pages/list/styles.ts";

type Props = {
    part: List
}

const ListCard = ({ part }: Props) => {
    const navigate = useNavigate()
    const { mutate, isSuccess } = useDeleteList()
    const [open, setOpen] = useState(false);
    
    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(true);
        mutate(part.id)
        handleClose()
    }
    
    return (
        <>
            <ListWrapper onClick={() =>navigate(`${part.id}`)}>
                <div onClick={(e) => handleOpen(e)}>
                    <StyledDeleteIcon style={{fontSize: "30px"}}>
                    </StyledDeleteIcon>
                </div>
                    <StyledTitle>{part.title}</StyledTitle>
                    <h4>Created: {part.createdDate}</h4>
                    {part.updatedDate ?
                        <h4>Last updated: {part.updatedDate}</h4>
                        : null
                    }
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