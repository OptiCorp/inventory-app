import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ListCard from '../../components/listCard/listCard.tsx'
import SearchBar from '../../components/searchBar/SearchBar'
import UmAppContext from '../../contexts/UmAppContext.tsx'
import { List } from '../../services/apiTypes.ts'
import { useAddList } from '../../services/hooks/List/useAddList.tsx'
import { useGetListsByUserId } from '../../services/hooks/List/useGetListsByUserId.tsx'
import { GlobalSpinnerContainer, SearchContainer, Spinner } from '../search/styles.ts'
import { CancelButton, FlexWrapper, SavedListsTitle, SubmitButton } from './styles.ts'

const MakeList = () => {
    const { currentUser } = useContext(UmAppContext)
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false)

    const { data: lists = [], isLoading } = useGetListsByUserId(currentUser!.id)

    const { mutate, isSuccess } = useAddList()

    useEffect(() => {
        setSearchTerm((prev) => searchParam || prev)
    }, [searchParam])

    const filteredData = lists.filter(
        (list) =>
            list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            list.items?.some(
                (item: any) =>
                    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.wpId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
    )

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        mutate({ createdById: currentUser!.id, title: title })
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

                <SubmitButton style={{ marginLeft: '13px' }} onClick={handleClickOpen}>
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
                    {filteredData.map((list: List) => (
                        <ListCard key={list.id} part={list} />
                    ))}
                </FlexWrapper>
            </SearchContainer>
        </>
    )
}

export default MakeList
