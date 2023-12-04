import { useNavigate } from 'react-router-dom'
import {ResultCard, Title, DeleteWrapper} from './styles'
import { useWindowDimensions } from '../../hooks'
import { List } from '../../services/apiTypes'
import {useDeleteList} from "../../services/hooks/useDeleteList.tsx";
import {useContext, useState} from "react";
import UmAppContext from "../../contexts/UmAppContext.tsx";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {CancelButton, SubmitButton} from "../../pages/list/styles.ts";


type Props = {
    part: List
}

const ListCard = ({ part }: Props) => {
    const navigate = useNavigate()
    const { width } = useWindowDimensions()

    const { currentUser } = useContext(UmAppContext)

   const { mutate, isSuccess } = useDeleteList()
    const handleDelete = () => {
        setOpen(true);
        mutate(part.id)
        handleClose()
    }

    const handleOpen = (e: Pick<MouseEvent, "stopPropagation">) => {
        e.stopPropagation()
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = useState(false);
    
    
    // @ts-ignore
    return (
        <>
            <ResultCard onClick={() =>navigate("/")}>
                <div  onClick={(e) => handleOpen(e as Pick<MouseEvent, "stopPropagation">)}>
                    <DeleteWrapper style={{fontSize: "30px"}}>
                    </DeleteWrapper>
                </div>
                    <Title>{part.title}</Title>
                    <h4>Created: {part.createdDate}</h4>
                    {part.updatedDate ?
                        <h4>Last updated: {part.updatedDate}</h4>
                        : null
                    }
            </ResultCard>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Delete list?</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleDelete}>Confirm</SubmitButton>
                </DialogActions>
            </Dialog>
        </>
        )
}

export default ListCard