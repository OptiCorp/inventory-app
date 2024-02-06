import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomDialog } from '../../../components/CustomDialog/CustomDialog.tsx';
import {
    StyleIcons,
    StyledContent,
    StyledText,
    StyledTitle,
} from '../../../components/ItemCard/SearchInfo/styles.ts';
import AppContext from '../../../contexts/AppContext.tsx';
import { Item, MutateItemList } from '../../../services/apiTypes.ts';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList.tsx';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList.tsx';
import { RemoveIcon, Wrapper } from './styles.ts';

type Props = {
    item: Item;
};

export const SideList = ({ item }: Props) => {
    const { listId } = useParams();
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();
    const { mutate: mutateAddItemToList } = useAddItemsToList();
    const [isClicked, setIsClicked] = useState(false);

    const handleDelete = (ids: MutateItemList) => {
        mutateRemoveItemFromList(ids, {
            onSuccess: (data) => {
                setSnackbarSeverity('success');
                setSnackbarText(`${item.wpId} was deleted`);

                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
        handleClose();
    };

    const handleAdd = (ids: MutateItemList) => {
        setIsClicked(true);
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
                    <StyledContent>
                        <StyledTitle>S/N</StyledTitle>
                        <StyledText>{item.serialNumber}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Location</StyledTitle>
                        <StyledText>{item.location?.name || 'Stavanger'}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Vendor</StyledTitle>
                        <StyledText>{item.vendor?.name || 'Vendor'}</StyledText>
                    </StyledContent>
                    <StyleIcons>
                        <RemoveIcon onClick={handleClickOpen} />
                        <IconButton
                            onClick={() =>
                                handleAdd({
                                    listId: listId ?? 'N/A',
                                    itemId: item.id,
                                    addSubItems: true,
                                })
                            }
                            // TODO: save the state between reloads. currently it resets on reload
                            color="primary"
                            disabled={isClicked}
                        >
                            <SubdirectoryArrowRightIcon />
                        </IconButton>
                    </StyleIcons>
                </Wrapper>
            </>

            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={() =>
                    handleDelete({
                        itemId: item.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};
