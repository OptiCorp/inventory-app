import { useNavigate } from 'react-router-dom'

import {Item, MutateItemList} from '../../services/apiTypes'
import {
    CompactCard,
    CompactDesriptionParagraph,
    CompactInfoP,
    KeyWords,
    ResultCardCompactContainer,
} from './styles'
import React, {ReactNode, useState} from "react";
import {
    StyledAddIcon,
    StyledDeleteIconAbsolute,
    StyledDeleteIconRelative,
    StyledRemoveIcon
} from "../listCard/styles.ts";
import {useAddItemsToList} from "../../services/hooks/useAddItemsToList.tsx";
import {useRemoveItemsFromList} from "../../services/hooks/useRemoveItemsFromList.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {CancelButton, SubmitButton} from "../../pages/listDetails/styles.ts";
import Dialog from "@mui/material/Dialog";

type Props = {
    part: Item;
    icon?: string;
    listId?: string
}

const SearchResultCardCompact = ({ part, icon }: Props) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList()

    const { mutate: mutateRemoveItemFromList, isSuccess: removeItemSuccess } = useRemoveItemsFromList()

    const handleAdd = (ids: MutateItemList) => {
        mutateAddItemToList(ids)
    }

    const handleDelete = (ids: MutateItemList) => {
        mutateRemoveItemFromList(ids)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <ResultCardCompactContainer
                onClick={() => {
                    navigate(`/${part.wpId}`)
                }}
            >
                {icon ==="add" ?
                    <StyledAddIcon style={{fontSize:"30px"}}></StyledAddIcon>
                    : null }

                {icon ==="remove" ?
                    <StyledRemoveIcon style={{fontSize:"30px"}}></StyledRemoveIcon>
                    : null }
                
                <CompactCard>
                    <CompactInfoP>
                        <KeyWords>ID:</KeyWords> {part.wpId}
                    </CompactInfoP>{' '}
                    <CompactInfoP>
                        <KeyWords>Location</KeyWords> {part.location}
                    </CompactInfoP>{' '}
                </CompactCard>
                <CompactDesriptionParagraph>
                    {part.description}
                </CompactDesriptionParagraph>
            </ResultCardCompactContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Remove item from list?</DialogTitle>
                <DialogActions>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    <SubmitButton onClick={handleClose}>Confirm</SubmitButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SearchResultCardCompact
