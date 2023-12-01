import SearchBar from '../../components/searchBar/SearchBar'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useDebounce, useLocalStorage} from "usehooks-ts";
import {useGetItems} from "../../services/hooks/useGetItems.tsx";
import {useGetLists} from "../../services/hooks/useGetLists.tsx";
import {useAddList} from "../../services/hooks/useAddList.tsx";
import {useGetListsByUserId} from "../../services/hooks/useGetListsByUserId.tsx";
import {useWindowDimensions} from "../../hooks";
import {
    Container,
    GlobalSpinnerContainer,
    RecentSearchContainer,
    RecentTitle,
    SearchContainer,
    Spinner, StyledSearchedLink
} from "../search/styles.ts";
import SearchResultCard from "../../components/searchResultCard/SearchResultCard.tsx";
// import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact.tsx";
import UmAppContext from "../../contexts/UmAppContext.tsx";
import {List} from "../../services/apiTypes.ts";
import { SubmitButton, CancelButton } from "./styles.ts";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListCard from "../../components/listCard/listCard.tsx";


const MakeList = () => {
    const { currentUser } = useContext(UmAppContext)
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const [title, setTitle] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const {
        data: lists = [],
        isLoading,
        isFetching,
    } = useGetListsByUserId(currentUser!.id)

    const { mutate, isSuccess } = useAddList()

    useEffect(() => {
        setSearchTerm((prev) => searchParam || prev)
    }, [searchParam])

    const filteredData = lists.filter(
        (list) =>
            list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            list.items?.some((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const { width } = useWindowDimensions()
    
    const [open, setOpen] = useState(false);
    
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
                
            
                    <RecentTitle style={{margin:"15px 0px 0px 15px"}}>Your saved lists</RecentTitle>


                {isLoading && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}

                <Container>
                    {filteredData
                        .slice(0)
                        ?.map((list: List) =>
                            <>
                           <ListCard part={list}/>
                            </>
                        )}
                </Container>
            </SearchContainer>
        </>
    )
}

export default MakeList
