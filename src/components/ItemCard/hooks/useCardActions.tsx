import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { MutateItemList } from '../../../services/apiTypes';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { ItemCardProps } from '../ItemCard';

export const useCardActions = ({ item }: ItemCardProps) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { listId } = useParams();
    const { data: list } = useGetListById(listId!);
    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList();
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();

    const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation();
        const alreadyAdded = list?.items.some((listItem) => listItem.id === item.id);

        if (alreadyAdded) {
            {
                setAlreadyAdded(true);
            }
            setSnackbarSeverity('error');
            setSnackbarText('already in list');
        } else {
            mutateAddItemToList(ids, {
                onSuccess: (data) => {
                    setSnackbarText(`${item.wpId} was added`);

                    if (data.status >= 400) {
                        setSnackbarSeverity('error');
                        setSnackbarText(`${data.statusText}, please try again.`);
                    }
                },
            });
        }
        handleClose();
    };

    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation();
        mutateRemoveItemFromList(ids, {
            onSuccess: (removeData) => {
                setSnackbarText(`${item.wpId} was removed`);

                if (removeData.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${removeData.statusText}, please try again.`);
                }
            },
        });
        handleClose();
    };

    const handleClickOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return {
        handleAdd,
        handleDelete,
        handleClickOpen,
        handleClose,
        alreadyAdded,
        open,
        setOpen,
        navigate,
        addItemSuccess,
    };
};
