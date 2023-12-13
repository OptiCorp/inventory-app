import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CancelButton, SubmitButton } from '../../pages/listDetails/styles.ts'
import { Item, MutateItemList } from '../../services/apiTypes'
import { useAddItemsToList } from '../../services/hooks/Items/useAddItemsToList.tsx'
import { useRemoveItemsFromList } from '../../services/hooks/Items/useRemoveItemsFromList.tsx'
import { StyledAddIcon, StyledRemoveIcon } from '../listCard/styles.ts'
import {
    CompactCard,
    CompactDesriptionParagraph,
    CompactInfoP,
    KeyWords,
    ResultCardCompactContainer,
} from './styles'

type Props = {
    part: Item
    icon?: string
}

const SearchResultCardCompact = ({ part, icon }: Props) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { listId } = useParams()
    const { mutate: mutateAddItemToList, isSuccess: addItemSuccess } = useAddItemsToList()
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
            <ResultCardCompactContainer
                onClick={() => {
                    navigate(`/${part.id}`)
                }}
            >
                <CompactCard>
                    <CompactInfoP>
                        <KeyWords>ID:</KeyWords> {part.wpId}
                    </CompactInfoP>{' '}
                    <CompactInfoP>
                        <KeyWords>Location</KeyWords> {/* {part.location || 'Location'} */}
                    </CompactInfoP>{' '}
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
                </CompactCard>
                <CompactDesriptionParagraph>{part.description}</CompactDesriptionParagraph>
            </ResultCardCompactContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Remove item from list?</DialogTitle>
                <DialogActions>
                    <CancelButton onClick={handleClose}>Cancel</CancelButton>
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

export default SearchResultCardCompact
