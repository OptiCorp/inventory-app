
import { Item, MutateItemList } from '../../../services/apiTypes'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    CancelButton,
    SubmitButton,
} from '../../../pages/listDetails/styles.ts'
import { Item, MutateItemList } from '../../../services/apiTypes'
import { useAddItemsToList } from '../../../services/hooks/useAddItemsToList.tsx'
import { useRemoveItemsFromList } from '../../../services/hooks/useRemoveItemsFromList.tsx'
import { StyledAddIcon, StyledRemoveIcon } from '../../listCard/styles.ts'

import {
    DescriptionParagraph,
    FirstInfoBox,
    InfoP,
    KeyWords,
    SecondInfoBox,
    ThirdInfoBox,
} from '../styles'

import React, { useState } from "react";
import { StyledAddIcon, StyledRemoveIcon } from "../../listCard/styles.ts";
import { useAddItemsToList } from "../../../services/hooks/useAddItemsToList.tsx";
import { useRemoveItemsFromList } from "../../../services/hooks/useRemoveItemsFromList.tsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { CancelButton, SubmitButton } from "../../../pages/listDetails/styles.ts";
import Dialog from "@mui/material/Dialog";
import { useParams } from "react-router-dom";
import { format } from "date-fns"


type Props = {
    part: Item
    icon?: string
}

export const Searchinfo = ({ part, icon }: Props) => {
    const [open, setOpen] = useState(false)
    const { listId } = useParams()

    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } =
        useAddItemsToList()
    const { mutate: mutateRemoveItemFromList, isSuccess: removeItemSuccess } =
        useRemoveItemsFromList()


    const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateAddItemToList(ids)
        handleClose(e)
    }
    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateRemoveItemFromList(ids)
        handleClose(e)
    }
    const handleClickOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpen(true)
    }
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation()

        setOpen(false)
    }


    return (
        <>
            {' '}
            <FirstInfoBox>
                <InfoP>
                    <KeyWords>WP ID</KeyWords>
                    {part.wpId}
                </InfoP>
                <InfoP>
                    <KeyWords> S/N</KeyWords>
                    {part.serialNumber}
                </InfoP>
                <InfoP>
                    <KeyWords> P/N</KeyWords>
                    {part.productNumber}
                </InfoP>
            </FirstInfoBox>
            <SecondInfoBox>
                <DescriptionParagraph>{part.description}</DescriptionParagraph>
            </SecondInfoBox>
            <ThirdInfoBox>
                <div style={{ alignSelf: 'flex-end' }}>
                    {icon === 'add' ? (
                        <StyledAddIcon
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
                </div>
                <InfoP>
                    <KeyWords>Location</KeyWords> {part.location || 'Location'}
                </InfoP>
                <InfoP>
                    {' '}
                    <KeyWords>Vendor</KeyWords>
                    {part.vendor}
                </InfoP>
                <InfoP>
                    {' '}
                    <KeyWords>{part.updatedDate ? 'Last updated' : 'Created on'}</KeyWords>{' '}
                    {format(new Date(part.updatedDate || part.createdDate), "yyyy-MM-dd HH:mm:ss").toString()}{' '}
                </InfoP>
            </ThirdInfoBox>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Remove item from list?</DialogTitle>
                <DialogActions>
                    <CancelButton onClick={() => handleClose}>
                        Cancel
                    </CancelButton>
                    <SubmitButton
                        onClick={(e) =>
                            handleDelete(e, {
                                itemId: part.id,
                                listId: listId!,
                            })
                        }
                    >
                        Confirm
                    </SubmitButton>

                </DialogActions>
            </Dialog>
        </>
    )
}
