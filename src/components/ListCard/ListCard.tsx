import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List } from '../../services/apiTypes.ts';

import { useDeleteList } from '../../services/hooks/list/useDeleteList.tsx';
import CustomDialog from '../CustomDialog/CustomDialog.tsx';
import { StyledDeleteIcon, StyledListWrapper, StyledTitle } from './styles.ts';

type Props = {
    part: List;
};

const ListCard = ({ part }: Props) => {
    const navigate = useNavigate();
    const { mutate } = useDeleteList();
    const [open, setOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(true);
        mutate(part.id);
        handleClose();
    };

    return (
        <>
            <StyledListWrapper onClick={() => navigate(`${part.id}`)}>
                <div onClick={(e) => handleOpen(e)}>
                    <StyledDeleteIcon style={{ fontSize: '30px' }}></StyledDeleteIcon>
                </div>
                <StyledTitle>{part.title}</StyledTitle>
                {part.updatedDate ? (
                    <h4>
                        Last updated:{' '}
                        {format(new Date(part.updatedDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                ) : (
                    <h4>
                        Created:{' '}
                        {format(new Date(part.createdDate), 'dd-MM-yyyy HH:mm:ss').toString()}
                    </h4>
                )}
            </StyledListWrapper>
            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Delete list?"
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={handleDelete}
            />
        </>
    );
};

export default ListCard;
