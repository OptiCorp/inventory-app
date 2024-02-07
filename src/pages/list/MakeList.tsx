import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button.tsx';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog.tsx';
import { GlobalSpinner } from '../../components/GlobalSpinner/GlobalSpinner.tsx';
import { ListCard } from '../../components/ListCard/ListCard.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import AppContext from '../../contexts/AppContext.tsx';
import { Item, List } from '../../services/apiTypes.ts';
import { useAddList } from '../../services/hooks/list/useAddList';
import { useGetListsByUserId } from '../../services/hooks/list/useGetListsByUserId';
import { SearchContainer } from '../search/styles.ts';
import { FlexWrapper, SearchAndButton } from './styles.ts';

const MakeList = () => {
    const { currentUser } = useContext(AppContext);
    const { searchParam } = useParams<{ searchParam: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);

    const { data: lists = [], isLoading } = useGetListsByUserId(currentUser!.id);

    const { mutate } = useAddList();

    useEffect(() => {
        setSearchTerm((prev) => searchParam ?? prev);
    }, [searchParam]);

    const filteredData = lists.filter(
        (list) =>
            list.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            list.items?.some(
                (item: Item) =>
                    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.wpId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.itemTemplate.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        mutate({ createdById: currentUser!.id, title: title });
        handleClose();
    };

    return (
        <>
            <SearchContainer>
                <SearchAndButton>
                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        placeholder={'Search for title or items'}
                    />

                    <Button variant="black" onClick={handleClickOpen}>
                        NEW LIST
                    </Button>
                </SearchAndButton>
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

                {isLoading && <GlobalSpinner />}

                <FlexWrapper>
                    {filteredData.map((list: List) => (
                        <ListCard key={list.id} item={list} />
                    ))}
                </FlexWrapper>
            </SearchContainer>
        </>
    );
};

export default MakeList;
