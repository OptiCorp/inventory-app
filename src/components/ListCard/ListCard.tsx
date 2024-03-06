import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import { List } from '../../services/apiTypes';
import { useDeleteList } from '../../services/hooks/list/useDeleteList';
import { CustomDialog } from '../CustomDialog/CustomDialog';
import { StyledDeleteIcon, StyledListWrapper, StyledTitle } from './styles';

type Props = {
    item: List;
};

export const ListCard = ({ item }: Props) => {
    const navigate = useNavigate();
    const { mutate } = useDeleteList();
    const [open, setOpen] = useState(false);
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(true);
        mutate(item.id, {
            onSuccess: (removeData) => {
                setSnackbarText(`${item.title} was deleted`);

                if (removeData.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${removeData.statusText}, please try again.`);
                }
            },
        });
        handleClose();
    };

    return (
        <>
            <StyledListWrapper onClick={() => navigate(`${item.id}`)}>
                <div onClick={(e) => handleOpen(e)}>
                    <StyledDeleteIcon style={{ fontSize: '30px' }}></StyledDeleteIcon>
                </div>
                <StyledTitle>{item.title}</StyledTitle>
                {item.updatedDate ? (
                    <h4>
                        Last updated:{' '}
                        {format(new Date(item.updatedDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                ) : (
                    <h4>
                        Created:{' '}
                        {format(new Date(item.createdDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                )}
            </StyledListWrapper>
            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Delete list?"
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={handleDelete}
                isWarning
            />
        </>
    );
};
