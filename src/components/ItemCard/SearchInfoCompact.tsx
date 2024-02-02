import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UmAppContext from '../../contexts/UmAppContext.tsx';
import { Item, MutateItemList } from '../../services/apiTypes.ts';
import { useAddItemsToList } from '../../services/hooks/items/useAddItemsToList.tsx';
import { useRemoveItemsFromList } from '../../services/hooks/items/useRemoveItemsFromList.tsx';
import { useGetListById } from '../../services/hooks/list/useGetListById.tsx';
import { Button } from '../Button/Button.tsx';
import CustomDialog from '../CustomDialog/CustomDialog.tsx';
import { StyledAddIcon, StyledRemoveIcon } from '../ListCard/styles.ts';
import {
    StyledCompactInfoP,
    StyledDescriptionWrap,
    StyledKeyWords,
    StyledItemCardCompactContainer,
} from './styles.ts';
type Props = {
    item: Item;
    icon?: string;
};
const SearchResultCardCompact = ({ item, icon }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { listId } = useParams();
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
            <StyledItemCardCompactContainer>
                <Accordion
                    style={{
                        boxShadow: 'none',
                        backgroundColor: 'white',
                        padding: '5px',
                    }}
                >
                    <AccordionSummary
                        style={{ alignItems: 'flex-end' }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledCompactInfoP>
                            <StyledKeyWords>ID:</StyledKeyWords>
                            {item.wpId}
                        </StyledCompactInfoP>{' '}
                        <StyledCompactInfoP>
                            <StyledKeyWords>Location</StyledKeyWords>{' '}
                            {item.location?.name || 'Location'}
                        </StyledCompactInfoP>
                        <StyledCompactInfoP>
                            <StyledKeyWords>Category</StyledKeyWords>{' '}
                            {item.itemTemplate.category?.name || 'Category'}
                        </StyledCompactInfoP>
                    </AccordionSummary>
                    <AccordionDetails style={{ alignItems: 'flex-end' }}>
                        <StyledDescriptionWrap>
                            <StyledKeyWords>Description</StyledKeyWords>{' '}
                            <Typography>{item.itemTemplate.description}</Typography>
                        </StyledDescriptionWrap>
                        <Button variant="white" onClick={() => navigate(`/${item.id}`)}>
                            More info
                        </Button>
                    </AccordionDetails>
                </Accordion>
                {icon === 'add' ? (
                    <StyledAddIcon
                        alreadyAdded={alreadyAdded}
                        active={addItemSuccess}
                        style={{ fontSize: '25px' }}
                        onClick={(e) =>
                            handleAdd(e, {
                                itemId: item.id,
                                listId: listId!,
                            })
                        }
                    ></StyledAddIcon>
                ) : null}
                {icon === 'remove' ? (
                    <StyledRemoveIcon
                        style={{ fontSize: '25px' }}
                        onClick={handleClickOpen}
                    ></StyledRemoveIcon>
                ) : null}
            </StyledItemCardCompactContainer>

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

export default SearchResultCardCompact;
