import SearchBar from '../../components/searchBar/SearchBar'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {useDebounce, useLocalStorage} from "usehooks-ts";
import {useGetItems} from "../../services/hooks/useGetItems.tsx";
import {useGetLists} from "../../services/hooks/useGetLists.tsx";
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

const MakeList = () => {
    const { currentUser } = useContext(UmAppContext)
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const {
        data: lists = [],
        isLoading,
        isFetching,
    } = useGetLists(debouncedSearchTerm, currentUser?.id)

    useEffect(() => {
        setSearchTerm((prev) => searchParam || prev)
    }, [searchParam])

    const { width } = useWindowDimensions()

    
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isLoading && (
                <GlobalSpinnerContainer>
                    <Spinner />
                </GlobalSpinnerContainer>
            )}
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                />
                
                <SubmitButton onClick={handleClickOpen}>
                    New list
                </SubmitButton>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New list</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="List title"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                        <SubmitButton onClick={handleClose}>Confirm</SubmitButton>
                    </DialogActions>
                </Dialog>
                
                
                

                <RecentSearchContainer>
                    <RecentTitle>Your saved lists</RecentTitle>
                </RecentSearchContainer>

                <Container>
                    {lists
                        .slice(0)
                        ?.map((list: List) =>
                            <>
                            <p>{list.title}</p>
                            <p>{list.createdDate}</p>
                            </>
                        )}
                </Container>
            </SearchContainer>
        </>
    )
}

export default MakeList
