import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UmAppContext from '../../contexts/UmAppContext.tsx'
import { useSnackBar } from '../../hooks/useSnackbar.tsx'
import { Item, MutateItemList } from '../../services/apiTypes'
import { useAddItemsToList } from '../../services/hooks/Items/useAddItemsToList.tsx'
import { useRemoveItemsFromList } from '../../services/hooks/Items/useRemoveItemsFromList.tsx'
import CustomDialog from '../Dialog/Index.tsx'
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
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const { snackbar } = useSnackBar()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const { listId } = useParams()
    const { mutate: mutateAddItemToList } = useAddItemsToList()
    const { mutate: mutateRemoveItemFromList, data: removeData } =
        useRemoveItemsFromList()

    const handleAdd = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateAddItemToList(ids, {
            onSuccess: (data) => {
                setSnackbarText(`${part.wpId} was added`)

                if (data.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                }
            },
        })
        handleClose(e)
    }
    const handleDelete = (e: React.MouseEvent, ids: MutateItemList) => {
        e.stopPropagation()
        mutateRemoveItemFromList(ids, {
            onSuccess: (removeData) => {
                setSnackbarText(`${part.wpId} was removed`)

                if (removeData.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(
                        `${removeData.statusText}, please try again.`
                    )
                }
            },
        })
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
                        <KeyWords>Location</KeyWords>{' '}
                        {part.location?.name || 'Location'}
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
                <CompactDesriptionParagraph>
                    {part.description}
                </CompactDesriptionParagraph>
            </ResultCardCompactContainer>

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

export default SearchResultCardCompact
