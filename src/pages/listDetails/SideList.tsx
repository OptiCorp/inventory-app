import { Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Item, MutateItemList } from '../../services/apiTypes.ts'
import { useRemoveItemsFromList } from '../../services/hooks/Items/useRemoveItemsFromList.tsx'
import {
    CancelButton,
    KeyWord,
    RemoveIcon,
    SubmitButton,
    Wrapper,
} from './styles.ts'
type Props = {
    part: Item
    icon?: string
}

export const SideList = ({ part, icon }: Props) => {
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const [open, setOpen] = useState(false)
    const { mutate: mutateRemoveItemFromList, isSuccess: removeItemSuccess } =
        useRemoveItemsFromList()

    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateRemoveItemFromList(ids)
        handleClose(e)
    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation()

        setOpen(false)
    }

    const handleClickOpen = (e: React.MouseEvent) => {
        e.stopPropagation()
        setOpen(true)
    }

    return (
        <>
            <>
                <Wrapper>
                    <KeyWord>
                        <b>WP ID</b>
                        {part.wpId}
                    </KeyWord>
                    <KeyWord>
                        {' '}
                        <b>Location</b> {part.location?.name || 'Location'}
                    </KeyWord>
                    <KeyWord>
                        {' '}
                        <b>Vendor</b> {part.vendor?.name || 'Vendor'}
                    </KeyWord>

                    <RemoveIcon onClick={handleClickOpen} />
                </Wrapper>
            </>
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
