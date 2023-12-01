import { useNavigate } from 'react-router-dom'

import { ResultCardContainer, Container, Title } from './styles'
import { useWindowDimensions } from '../../hooks'
import { List } from '../../services/apiTypes'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDeleteList} from "../../services/hooks/useDeleteList.tsx";
import {useContext, useState} from "react";
import UmAppContext from "../../contexts/UmAppContext.tsx";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from "@mui/material/TextField";
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
        handleOpen()
        mutate(part.id)
        handleClose()
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open, setOpen] = useState(false);
    
    
    return (
        <>
            <Container>
    <ResultCardContainer>
      <Title>{part.title}</Title>
        <DeleteForeverIcon onClick={handleOpen} style={{color: "red", position: "absolute", top:"3px", right:"1px", fontSize:"30px"}}/>
        <h4>Created: {part.createdDate}</h4>
        {part.updatedDate ?
            <h4>Updated: {part.updatedDate}</h4>
            :
            <></>
        }
        </ResultCardContainer>
            </Container>

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