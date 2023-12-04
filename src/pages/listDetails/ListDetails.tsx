import SearchBar from '../../components/searchBar/SearchBar'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useAddList} from "../../services/hooks/useAddList.tsx";
import {useGetListsByUserId} from "../../services/hooks/useGetListsByUserId.tsx";
import {
    GlobalSpinnerContainer,
    SearchContainer,
    Spinner
} from "../search/styles.ts";
import UmAppContext from "../../contexts/UmAppContext.tsx";
import {List} from "../../services/apiTypes.ts";
import { SubmitButton, CancelButton, SavedListsTitle, FlexWrapper } from "./styles.ts";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListCard from "../../components/listCard/listCard.tsx";
import {useGetListById} from "../../services/hooks/useGetListById.tsx";

const ListDetails = () => {
    const { currentUser } = useContext(UmAppContext)
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false);
    
    const {
        data: lists = [],
        isLoading,
        isFetching,
    } = useGetListById(listId!)

    const { mutate, isSuccess } = useAddList()
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = () => {
        mutate({createdById: currentUser!.id, title: title})
        handleClose()
    }

    return (
        <>
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={'Search for title or items'}
                />
                
                <SubmitButton style={{marginLeft:"13px"}} onClick={handleClickOpen}>
                    New list
                </SubmitButton>
                
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New list</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="title"
                            label="List title"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                        <SubmitButton onClick={handleSubmit}>Confirm</SubmitButton>
                    </DialogActions>
                </Dialog>
                
                <SavedListsTitle>Your saved lists</SavedListsTitle>

                {isLoading && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}

                <FlexWrapper>
                           <ListCard part={lists}/>
                        
                </FlexWrapper>
            </SearchContainer>
        </>
    )
}

export default ListDetails
