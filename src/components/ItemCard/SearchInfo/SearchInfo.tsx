import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { MutateItemList } from '../../../services/apiTypes';

import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';

import UmAppContext from '../../../contexts/UmAppContext';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import CustomDialog from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledInfoIcon, StyledRemoveIcon } from '../../ListCard/styles';

import {
    StyledBox,
    StyledDescriptionParagraph,
    StyledInfoP,
    StyledKeyWords,
    StyledSecondInfoBox,
} from './styles';
import { ItemCardProps } from '../ItemCard';

export const SearchInfo = ({ item, icon }: ItemCardProps) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);

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

    const date = format(
        new Date(item.updatedDate ?? item.createdDate),
        'yyyy-MM-dd HH:mm:ss'
    ).toString();

    return (
        <>
            <StyledBox>
                <StyledInfoP>
                    <StyledKeyWords>WP ID</StyledKeyWords>
                    {item.wpId}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords> S/N</StyledKeyWords>
                    {item.serialNumber}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords> P/N</StyledKeyWords>
                    {item.itemTemplate.productNumber}
                </StyledInfoP>
            </StyledBox>
            <StyledSecondInfoBox>
                <StyledDescriptionParagraph>
                    {item.itemTemplate.description}
                </StyledDescriptionParagraph>
            </StyledSecondInfoBox>
            <StyledBox>
                {' '}
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
                {location.pathname.includes('/makelist') && (
                    <StyledInfoIcon
                        onClick={() => {
                            navigate(`/${item.id}`);
                        }}
                    ></StyledInfoIcon>
                )}
                <StyledInfoP>
                    <StyledKeyWords>Location</StyledKeyWords>
                    {item.location?.name ?? 'Location'}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords>Vendor</StyledKeyWords>
                    {item.vendor?.name ?? ''}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords>
                        {item.updatedDate ? 'Last updated' : 'Created on'}
                    </StyledKeyWords>
                    {date}
                </StyledInfoP>
            </StyledBox>
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
