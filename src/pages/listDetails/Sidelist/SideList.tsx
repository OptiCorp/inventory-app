import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Item, MutateItemList } from '../../../services/apiTypes.ts'
import { useRemoveItemsFromList } from '../../../services/hooks/Items/useRemoveItemsFromList.tsx'

import CustomDialog from '../../../components/CustomDialog/CustomDialog.tsx'
import UmAppContext from '../../../contexts/UmAppContext.tsx'
import { KeyWord, RemoveIcon, Wrapper } from './styles.ts'
type Props = {
    part: Item
}

export const SideList = ({ part }: Props) => {
    const { listId } = useParams()
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const [open, setOpen] = useState(false)
    const {
        mutate: mutateRemoveItemFromList,
        isSuccess,
        data,
    } = useRemoveItemsFromList()

    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateRemoveItemFromList(ids, {
            onSuccess: (data) => {
                setSnackbarSeverity('success')
                setSnackbarText(`${part.wpId} was deleted`)

                if (data.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                }
            },
        })
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
                        <b>Location</b> {part.location?.name || 'Location'}
                    </KeyWord>
                    <KeyWord>
                        <b>Vendor</b> {part.vendor?.name || 'Vendor'}
                    </KeyWord>

                    <RemoveIcon onClick={handleClickOpen} />
                </Wrapper>
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
