import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../../contexts/AppContext';
import { MutateItemList } from '../../../services/apiTypes';
import { useAddItemsToList } from '../../../services/hooks/items/useAddItemsToList';
import { useRemoveItemsFromList } from '../../../services/hooks/items/useRemoveItemsFromList';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { StyledAddIcon, StyledRemoveIcon } from '../../ListCard/styles';
import { ItemCardProps } from '../ItemCard';
import {
    StyledCompactBox,
    StyledCompactContent,
    StyledCompactDescriptionParagraph,
    StyledCompactDescriptionWrap,
    StyledCompactText,
    StyledCompactTitle,
    StyledItemCardCompactContainer,
} from './styles';

const SearchResultCardCompact = ({ item, icon }: ItemCardProps) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { listId } = useParams();
    const { data: list } = useGetListById(listId!);
    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList();
    const { mutate: mutateRemoveItemFromList } = useRemoveItemsFromList();

    const handleAdd = (event: React.MouseEvent, ids: MutateItemList) => {
        event.stopPropagation();
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
    const handleDelete = (event: React.MouseEvent, ids: MutateItemList) => {
        event.stopPropagation();
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
    const handleClickOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
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
                        borderRadius: '0px',
                    }}
                >
                    <AccordionSummary
                        style={{
                            display: 'flex',
                            minWidth: '300px',
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
                                <StyledCompactText>{item.location?.name ?? ''}</StyledCompactText>
                            </StyledCompactContent>
                            <StyledCompactContent>
                                <StyledCompactTitle>Category</StyledCompactTitle>
                                <StyledCompactText>
                                    {item.itemTemplate.category?.name ?? 'Category'}
                                </StyledCompactText>
                            </StyledCompactContent>
                        </StyledCompactBox>
                    </AccordionSummary>
                    <AccordionDetails>
                        <StyledCompactDescriptionWrap>
                            <StyledCompactTitle>Description</StyledCompactTitle>
                            <StyledCompactDescriptionParagraph>
                                {item.itemTemplate.description}
                            </StyledCompactDescriptionParagraph>
                        </StyledCompactDescriptionWrap>
                    </AccordionDetails>
                    <AccordionActions>
                        <Button
                            component={NavLink}
                            to={`/${item.id}`}
                            onClick={() => navigate(`/item/${item.id}`)}
                        >
                            Show more
                        </Button>
                    </AccordionActions>
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
                SubmitButtonOnClick={(event: React.MouseEvent) =>
                    handleDelete(event, {
                        itemId: item.id,
                        listId: listId!,
                    })
                }
            />
        </>
    );
};

export default SearchResultCardCompact;
