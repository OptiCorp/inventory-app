import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item, MutateItemList } from '../../../services/apiTypes.ts';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList.tsx';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import IconButton from '@mui/material/IconButton';

import CustomDialog from '../../../components/CustomDialog/CustomDialog.tsx';
import UmAppContext from '../../../contexts/UmAppContext.tsx';
import { KeyWord, RemoveIcon, Wrapper } from './styles.ts';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList.tsx';
import { useGetListById } from '../../../services/hooks/list/useGetListById';

type Props = {
    part: Item;
};

export const SideList = ({ part }: Props) => {
    const { listId } = useParams();
    // console.log('listid', listId);
    const { data: list } = useGetListById(listId!);
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
    const [open, setOpen] = useState(false);
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();
    const { mutate: mutateAddItemToList } = useAddItemsToList();

    const handleDelete = (ids: MutateItemList) => {
        mutateRemoveItemFromList(ids, {
            onSuccess: (data) => {
                setSnackbarSeverity('success');
                setSnackbarText(`${part.wpId} was deleted`);

                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
        handleClose();
    };

    const handleAdd = (ids: MutateItemList) => {
        console.log('add');
        mutateAddItemToList(ids, {});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <>
                <Wrapper>
                    <KeyWord>
                        <b>WP ID</b>
                        {part.wpId}
                    </KeyWord>
                    <KeyWord>
                        <b>Location</b> {part.location?.name || 'Location'}
                    </KeyWord>
                    <KeyWord>
                        <b>Vendor</b> {part.vendor?.name || 'Vendor'}
                    </KeyWord>

                    <RemoveIcon onClick={handleClickOpen} />
                    <IconButton
                        onClick={() =>
                            handleAdd({
                                listId: listId ?? 'N/A',
                                itemId: part.id,
                                addSubItems: true,
                            })
                        }
                    >
                        <SubdirectoryArrowRightIcon />
                    </IconButton>
                </Wrapper>
            </>

            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={() =>
                    handleDelete({
                        itemId: part.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};
