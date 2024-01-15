import { format } from 'date-fns';
import { useContext, useState } from 'react';

import { Chip, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../../components/CustomDialog/CustomDialog';
import UmAppContext from '../../contexts/UmAppContext';
import { useSnackBar, useWindowDimensions } from '../../hooks';
import { List, UpdateList } from '../../services/apiTypes';
import { useDeleteList } from '../../services/hooks/list/useDeleteList';
import { useUpdateList } from '../../services/hooks/list/useUpdateList';
import { DeleteIcon, EditIcon } from './sidelist/styles';
import {
    FlexContainer,
    Header,
    IconContainer,
    IconContainerCompact,
    ListTitle,
    StyledDate,
    Wrapper,
    WrapperCompact,
} from './styles';

type Props = {
    list: List;
};

export const ListHeader = ({ list }: Props) => {
    const { width } = useWindowDimensions();

    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
    const [title, setTitle] = useState(list.title);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { mutate, isSuccess, status, data: deleteData } = useDeleteList();
    const {
        mutate: updateList,
        status: listUpdateStatus,
        isSuccess: listSuccess,
    } = useUpdateList(list.id);
    const { snackbar } = useSnackBar();

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
            {' '}
            {width > 800 ? (
                <Header>
                    <Wrapper>
                        <StyledDate>
                            {' '}
                            {format(new Date(list.createdDate), 'dd-MM-yyyy').toString()}
                        </StyledDate>{' '}
                        <ListTitle>{list.title}</ListTitle>
                    </Wrapper>
                    <FlexContainer>
                        <IconContainer>
                            <Chip
                                style={{ marginRight: '20px' }}
                                label={`${list?.items?.length} Items`}
                            />{' '}
                        </IconContainer>
                        <IconContainer onClick={(e) => handleOpenEdit(e)}>
                            <EditIcon />
                        </IconContainer>
                        <IconContainer onClick={(e) => handleOpen(e)}>
                            <DeleteIcon />
                        </IconContainer>
                    </FlexContainer>
                </Header>
            ) : (
                <>
                    <WrapperCompact>
                        <Wrapper>
                            <StyledDate>
                                {' '}
                                {format(new Date(list.createdDate), 'dd-MM-yyyy').toString()}
                            </StyledDate>{' '}
                            <ListTitle>{list.title}</ListTitle>{' '}
                        </Wrapper>{' '}
                        <IconContainerCompact>
                            <IconContainer onClick={(e) => handleOpenEdit(e)}>
                                <EditIcon />
                            </IconContainer>
                            <IconContainer onClick={(e) => handleOpen(e)}>
                                <DeleteIcon />
                            </IconContainer>{' '}
                        </IconContainerCompact>
                    </WrapperCompact>
                </>
            )}
            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Delete list?"
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
            {snackbar}
        </>
    );
};
