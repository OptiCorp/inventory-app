import { useContext, useState } from 'react';
import { PartCardProps } from '../../../components/PartCard/PartCard';
import UmAppContext from '../../../contexts/UmAppContext';
import { MutateItemList } from '../../../services/apiTypes';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { useGetListById } from '../../../services/hooks/list/useGetListById';

export const usePartActions = ({ part }: PartCardProps, listId: string | undefined) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);

    const [open, setOpen] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { data: list } = useGetListById(listId ?? 'default'); // TODO: fix this to not use default
    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList();
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();

    const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation();
        const alreadyAdded = list?.items.some((item) => item.id === part.id);
        if (alreadyAdded) {
            {
                setAlreadyAdded(true);
            }
            setSnackbarSeverity('error');
            setSnackbarText('already in list');
        }
        mutateAddItemToList(ids, {
            onSuccess: (data) => {
                if (alreadyAdded) return;
                setSnackbarText(`${part.wpId} was added`);

                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
        handleClose(e);
    };

    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation();
        mutateRemoveItemFromList(ids, {
            onSuccess: (removeData) => {
                setSnackbarText(`${part.wpId} was removed`);

                if (removeData.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${removeData.statusText}, please try again.`);
                }
            },
        });
        handleClose(e);
    };

    const handleClickOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
    };

    return {
        handleAdd,
        handleDelete,
        handleClickOpen,
        handleClose,
        setSnackbarText,
        setSnackbarSeverity,
        open,
        alreadyAdded,
        addItemSuccess,
    };
};
