import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { MutateItemList } from '../../../services/apiTypes';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledInfoIcon, StyledRemoveIcon } from '../../ListCard/styles';
import { ItemCardProps } from '../ItemCard';
import {
    StyledBox,
    StyledContainer,
    StyledContent,
    StyledDescriptionParagraph,
    StyledSecondInfoBox,
    StyledText,
    StyledTitle,
} from './styles';

export const SearchInfo = ({ item, icon }: ItemCardProps) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);

    const [open, setOpen] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { listId } = useParams();
    const navigate = useNavigate();
    const { data: list } = useGetListById(listId!);
    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList();
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();

    const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation();
        const alreadyAdded = list?.items.some((item) => item.id === item.id);
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
                setSnackbarText(`${item.wpId} was added`);

                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
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

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <StyledContent>
                        <StyledTitle>S/N</StyledTitle>
                        <StyledText>{item.serialNumber}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>P/N</StyledTitle>
                        <StyledText>{item.itemTemplate?.productNumber}</StyledText>
                    </StyledContent>
                </StyledBox>
                <StyledSecondInfoBox>
                    <StyledDescriptionParagraph>
                        {item.itemTemplate?.description}
                    </StyledDescriptionParagraph>
                </StyledSecondInfoBox>
                <StyledBox>
                    <>
                        {icon === 'add' ? (
                            <StyledAddIcon
                                alreadyAdded={alreadyAdded}
                                active={addItemSuccess}
                                onClick={(e) =>
                                    handleAdd(e, {
                                        itemId: item.id,
                                        listId: listId!,
                                    })
                                }
                            ></StyledAddIcon>
                        ) : (
                            icon === 'remove' && (
                                <StyledRemoveIcon
                                    style={{ fontSize: '25px' }}
                                    onClick={handleClickOpen}
                                ></StyledRemoveIcon>
                            )
                        )}
                    </>
                    {location.pathname.includes('/make-list') && (
                        <StyledInfoIcon
                            onClick={() => {
                                navigate(`/${item.id}`);
                            }}
                        ></StyledInfoIcon>
                    )}
                    <StyledContent>
                        <StyledTitle>Location</StyledTitle>
                        <StyledText>{item.location?.name ?? 'Location'}</StyledText>
                    </StyledContent>
                    <StyledContent>
                        <StyledTitle>Category</StyledTitle>
                        <StyledText>{item.itemTemplate?.category.name}</StyledText>
                    </StyledContent>
                </StyledBox>
            </StyledContainer>
            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={(e) =>
                    handleDelete(e, {
                        itemId: item.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};
