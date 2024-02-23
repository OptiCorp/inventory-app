import { Chip, TextField } from '@mui/material';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';
import AppContext from '../../contexts/AppContext';
import { useWindowDimensions } from '../../hooks';
import { List, UpdateList } from '../../services/apiTypes';
import { useDeleteList } from '../../services/hooks/list/useDeleteList';
import { useUpdateList } from '../../services/hooks/list/useUpdateList';
import { DeleteIcon, EditIcon } from './sidelist/styles';
import {
    FlexContainer,
    Header,
    IconContainerCompact,
    ListTitle,
    Wrapper,
    WrapperCompact,
} from './styles';

type Props = {
    list: List;
};

export const ListHeader = ({ list }: Props) => {
    const { width } = useWindowDimensions();

    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const [title, setTitle] = useState(list.title);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { mutate } = useDeleteList();
    const { mutate: updateList } = useUpdateList(list.id);

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleOpenEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpenEdit(true);
    };

    const handleEdit = () => {
        setOpenEdit(true);
        const newTitle: UpdateList = { id: list.id, title: title ?? list.title };
        updateList(newTitle, {
            onSuccess: (data) => {
                setSnackbarText(`${list.title} was changed to ${title}`);
                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });

        handleEditClose();
    };
    const handleEditClose = () => {
        setOpenEdit(false);
    };

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(true);
        mutate(list.id, {
            onSuccess: (deleteData) => {
                handleClose();

                setSnackbarText(`${list.title} was deleted`);
                navigate('/makelist');
                if (deleteData.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${deleteData.statusText}, please try again.`);
                }
            },
        });
    };

    return (
        <>
            {width > 800 ? (
                <Header>
                    <ListTitle>{list.title}</ListTitle>
                    <Wrapper>{format(new Date(list.createdDate), 'dd-MM-yyyy').toString()}</Wrapper>
                    <FlexContainer>
                        <div>
                            <Chip
                                style={{ marginRight: '20px' }}
                                label={`${list?.items?.length} Items`}
                            />
                        </div>
                        <div onClick={(e) => handleOpenEdit(e)}>
                            <EditIcon />
                        </div>
                        <div onClick={(e) => handleOpen(e)}>
                            <DeleteIcon />
                        </div>
                    </FlexContainer>
                </Header>
            ) : (
                <>
                    <WrapperCompact>
                        <ListTitle>{list.title}</ListTitle>
                        <Wrapper>
                            {format(new Date(list.createdDate), 'dd-MM-yyyy').toString()}
                        </Wrapper>
                        <IconContainerCompact>
                            <div onClick={(e) => handleOpenEdit(e)}>
                                <EditIcon />
                            </div>
                            <div onClick={(e) => handleOpen(e)}>
                                <DeleteIcon />
                            </div>
                        </IconContainerCompact>
                    </WrapperCompact>
                </>
            )}
            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Delete list?"
                isWarning
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={handleDelete}
            />
            <CustomDialog
                open={openEdit}
                onClose={handleEditClose}
                title="Edit title"
                CancelButtonOnClick={handleEditClose}
                SubmitButtonOnClick={handleEdit}
            >
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="List title"
                    defaultValue={title ?? list.title}
                    fullWidth
                    variant="standard"
                />
            </CustomDialog>
        </>
    );
};
