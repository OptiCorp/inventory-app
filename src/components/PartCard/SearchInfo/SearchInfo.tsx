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
import { PartCardProps } from '../PartCard';

export const SearchInfo = ({ part, icon }: PartCardProps) => {
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

    const date = format(
        new Date(part.updatedDate ?? part.createdDate),
        'yyyy-MM-dd HH:mm:ss'
    ).toString();

    return (
        <>
            <StyledBox>
                <StyledInfoP>
                    <StyledKeyWords>WP ID</StyledKeyWords>
                    {part.wpId}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords> S/N</StyledKeyWords>
                    {part.serialNumber}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords> P/N</StyledKeyWords>
                    {part.productNumber}
                </StyledInfoP>
            </StyledBox>
            <StyledSecondInfoBox>
                <StyledDescriptionParagraph>{part.description}</StyledDescriptionParagraph>
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
                                    itemId: part.id,
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
                            navigate(`/${part.id}`);
                        }}
                    ></StyledInfoIcon>
                )}
                <StyledInfoP>
                    <StyledKeyWords>Location</StyledKeyWords>
                    {part.location?.name ?? 'Location'}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords>Vendor</StyledKeyWords>
                    {part.vendor?.name ?? ''}
                </StyledInfoP>
                <StyledInfoP>
                    <StyledKeyWords>
                        {part.updatedDate ? 'Last updated' : 'Created on'}
                    </StyledKeyWords>
                    {date}
                </StyledInfoP>
            </StyledBox>
            <CustomDialog
                title="Remove item from list?"
                open={open}
                onClose={handleClose}
                CancelButtonOnClick={() => handleClose}
                SubmitButtonOnClick={(e) =>
                    handleDelete(e, {
                        itemId: part.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};
