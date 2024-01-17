import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UmAppContext from '../../contexts/UmAppContext.tsx';
import { Item, MutateItemList } from '../../services/apiTypes.ts';
import { useAddItemsToList } from '../../services/hooks/items/useAddItemsToList.tsx';
import { useRemoveItemsFromList } from '../../services/hooks/items/useRemoveItemsFromList.tsx';
import { useGetListById } from '../../services/hooks/list/useGetListById.tsx';
import { COLORS } from '../../style/GlobalStyles.ts';
import { Button } from '../Button/Button.tsx';
import CustomDialog from '../CustomDialog/CustomDialog.tsx';
import { StyledAddIcon, StyledRemoveIcon } from '../ListCard/styles.ts';
import {
    ButtonText,
    CompactInfoP,
    DescriptionWrap,
    KeyWords,
    PartCardCompactContainer,
} from './styles.ts';
type Props = {
    part: Item;
    icon?: string;
};
const SearchResultCardCompact = ({ part, icon }: Props) => {
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

    return (
        <>
            <PartCardCompactContainer>
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
                        <CompactInfoP>
                            <KeyWords>ID:</KeyWords>
                            {part.wpId}
                        </CompactInfoP>{' '}
                        <CompactInfoP>
                            <KeyWords>Location</KeyWords> {part.location?.name || 'Location'}
                        </CompactInfoP>
                        <CompactInfoP>
                            <KeyWords>Category</KeyWords> {part.category?.name || 'Category'}
                        </CompactInfoP>
                    </AccordionSummary>
                    <AccordionDetails style={{ alignItems: 'flex-end' }}>
                        <DescriptionWrap>
                            <KeyWords>Description</KeyWords>{' '}
                            <Typography>{part.description}</Typography>
                        </DescriptionWrap>
                        <Button
                            backgroundColor={`${COLORS.white}`}
                            height="20px"
                            color={`${COLORS.black}`}
                            onClick={() => navigate(`/${part.id}`)}
                        >
                            <ButtonText> More info</ButtonText>
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
                                itemId: part.id,
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
            </PartCardCompactContainer>

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

export default SearchResultCardCompact;
