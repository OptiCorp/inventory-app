import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { IconButton } from '@mui/material';
import { useContext, useState } from 'react';
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
import { useGetItemById } from '../../../services/hooks/items/useGetItemById';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { useGetItemTemplateById } from '../../../services/hooks/template/useGetItemTemplateById';
import { RemoveIcon, Wrapper } from './styles';

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
    const { data: itemTemplateData } = useGetItemTemplateById(item?.itemTemplate?.id);
    const { data: itemm } = useGetItemById(item.id);
    return (
        <>
            <>
                <Wrapper>
                    <StyledContent>
                        <StyledTitle>S/N</StyledTitle>
                        <StyledText>{item.serialNumber}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Category</StyledTitle>
                        <StyledText>{itemTemplateData?.category?.name ?? ''} </StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Vendor</StyledTitle>
                        <StyledText>{itemm?.vendor.name ?? ''}</StyledText>
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
