import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext.tsx';
import { MutateItemList } from '../../../services/apiTypes.ts';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList.tsx';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList.tsx';
import { useGetListById } from '../../../services/hooks/list/useGetListById.tsx';
import { Button as ButtonOld } from '../../Button/Button.tsx';
import CustomDialog from '../../CustomDialog/CustomDialog.tsx';
import { StyledAddIcon, StyledRemoveIcon } from '../../ListCard/styles.ts';
import { ItemCardProps } from '../ItemCard.tsx';
import {
    StyledCompactBox,
    StyledCompactContent,
    StyledCompactInfoP,
    StyledCompactText,
    StyledCompactTitle,
    StyledCompactDescriptionWrap,
    StyledItemCardCompactContainer,
    StyledKeyWords,
} from './styles.ts';
import { Button } from '@mui/material';

const SearchResultCardCompact = ({ item, icon }: ItemCardProps) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
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
                        backgroundColor: 'lightcyan',
                        // padding: '5px',
                        borderRadius: '0px',
                    }}
                >
                    <AccordionSummary
                        style={{
                            display: 'flex',
                            minWidth: '300px',
                            backgroundColor: 'lightblue',
                            gap: '16px',
                        }}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <StyledCompactBox>
                            <StyledCompactContent>
                                <StyledCompactTitle>ID:</StyledCompactTitle>
                                <StyledCompactText>{item.wpId}</StyledCompactText>
                            </StyledCompactContent>
                            <StyledCompactContent>
                                <StyledCompactTitle>Location</StyledCompactTitle>
                                <StyledCompactText>
                                    {item.location?.name ?? 'Location'}
                                </StyledCompactText>
                            </StyledCompactContent>
                            <StyledCompactContent>
                                <StyledCompactTitle>Category</StyledCompactTitle>
                                <StyledCompactText>
                                    {item.itemTemplate.category?.name ?? 'Category'}
                                </StyledCompactText>
                            </StyledCompactContent>
                        </StyledCompactBox>
                    </AccordionSummary>
                    <AccordionDetails style={{}}>
                        <StyledCompactDescriptionWrap>
                            <StyledCompactTitle>Description</StyledCompactTitle>
                            <Typography>{item.itemTemplate.description}</Typography>
                        </StyledCompactDescriptionWrap>
                        <Button
                            component={NavLink}
                            to={`/${item.id}`}
                            onClick={() => navigate(`/${item.id}`)}
                            variant="contained"
                        >
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
