import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';
import { GlobalSpinner } from '../../components/GlobalSpinner/GlobalSpinner';
import { ListCard } from '../../components/ListCard/ListCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import AppContext from '../../contexts/AppContext';
import { useWindowDimensions } from '../../hooks';
import { Item, List } from '../../services/apiTypes';
import { useAddList } from '../../services/hooks/list/useAddList';
import { useGetListsByUserId } from '../../services/hooks/list/useGetListsByUserId';
import { SearchContainer } from '../search/styles';
import { FlexWrapper, SearchAndButton } from './styles';
import { Button } from '../../components/Button/Button.tsx';

export const MakeList = () => {
    const { currentUser } = useContext(AppContext);
    const { searchParam } = useParams<{ searchParam: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const { width } = useWindowDimensions();
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
                <SearchAndButton width={width}>
                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        placeholder={'Search for title or items'}
                    />
                    <div style={{ marginTop: '19px' }}>
                        <Button onClick={handleClickOpen} variant="black">
                            New list
                        </Button>
                    </div>
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
