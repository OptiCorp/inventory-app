import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { IconButton } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CustomDialog } from '../../../components/CustomDialog/CustomDialog';
import {
    StyleIcons,
    StyledContent,
    StyledText,
    StyledTitle,
} from '../../../components/ItemCard/SearchInfo/styles';
import AppContext from '../../../contexts/AppContext';
import { Item, MutateItemList } from '../../../services/apiTypes';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { RemoveIcon, Wrapper } from './styles';

type Props = {
    item: Item;
};

export const SideList = ({ item }: Props) => {
    const { listId } = useParams();
    const { setSnackbarText, setSnackbarSeverity, setCurrentItem, currentItem } =
        useContext(AppContext);
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

    const handleSetCurrentItem = (item: Item) => {
        setCurrentItem(item);
    };

    console.log(currentItem);

    return (
        <>
            <>
                <Wrapper onClick={() => handleSetCurrentItem(item)}>
                    <StyledContent>
                        <StyledTitle>S/N</StyledTitle>
                        <StyledText>{item.serialNumber}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Category</StyledTitle>
                        <StyledText>{item.itemTemplate.category.name ?? ''} </StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Vendor</StyledTitle>
                        <StyledText>{item?.vendor?.name ?? ''}</StyledText>
                    </StyledContent>
                    <StyleIcons onClick={(e: React.MouseEvent) => e.stopPropagation()}>
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
