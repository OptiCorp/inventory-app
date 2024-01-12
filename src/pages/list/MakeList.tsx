import TextField from '@mui/material/TextField'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/Button/SubmitButton.tsx'
import CustomDialog from '../../components/Dialog/Index.tsx'
import ListCard from '../../components/listCard/listCard.tsx'
import SearchBar from '../../components/searchBar/SearchBar'
import UmAppContext from '../../contexts/UmAppContext.tsx'
import { useSnackBar } from '../../hooks/useSnackbar.tsx'
import { Item, List } from '../../services/apiTypes.ts'
import { useAddList } from '../../services/hooks/List/useAddList.tsx'
import { useGetListsByUserId } from '../../services/hooks/List/useGetListsByUserId.tsx'
import { COLORS } from '../../style/GlobalStyles.ts'
import { GlobalSpinnerContainer, SearchContainer, Spinner } from '../search/styles.ts'
import { FlexWrapper } from './styles.ts'

const MakeList = () => {
    const { currentUser } = useContext(UmAppContext)
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const [title, setTitle] = useState('')
    const [open, setOpen] = useState(false)

    const { data: lists = [], isLoading } = useGetListsByUserId(currentUser!.id)

    const { mutate, isSuccess } = useAddList()
    const { snackbar } = useSnackBar()
    useEffect(() => {
        setSearchTerm((prev) => searchParam ?? prev)
    }, [searchParam])

    const filteredData = lists.filter(
        (list) =>
            list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            list.items?.some(
                (item: Item) =>
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

                <Button
                    backgroundColor={` ${COLORS.primary}`}
                    color={` ${COLORS.secondary}`}
                    onClick={handleClickOpen}
                >
                    NEW LIST
                </Button>

                <CustomDialog
                    title="New list"
                    open={open}
                    onClose={handleClose}
                    CancelButtonOnClick={handleClose}
                    SubmitButtonOnClick={handleSubmit}
                >
                    <TextField
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="title"
                        label="List title"
                        fullWidth
                        variant="standard"
                    />
                </CustomDialog>

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
            {snackbar}
        </>
    )
}

export default MakeList
