import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import { Item, MutateItemList } from '../../../services/apiTypes.ts'
import { useRemoveItemsFromList } from '../../../services/hooks/Items/useRemoveItemsFromList.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'

import CustomDialog from '../../../components/Dialog/Index.tsx'
import { ButtonWrap, KeyWord, RemoveIcon, Wrapper } from './styles.ts'
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
                <ButtonWrap>
                    <Button
                        backgroundColor={`${COLORS.secondary}`}
                        color={`${COLORS.primary}`}
                    >
                        Save list
                    </Button>
                    <Button
                        backgroundColor={`${COLORS.secondary}`}
                        color={`${COLORS.primary}`}
                    >
                        Export
                    </Button>
                </ButtonWrap>
            </>

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
    )
}
