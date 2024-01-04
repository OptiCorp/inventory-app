import { format } from 'date-fns'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Item, MutateItemList } from '../../../services/apiTypes'

import { useAddItemsToList } from '../../../services/hooks/Items/useAddItemsToList'
import { useRemoveItemsFromList } from '../../../services/hooks/Items/useRemoveItemsFromList'

import UmAppContext from '../../../contexts/UmAppContext'
import { useSnackBar } from '../../../hooks'
import { useGetListById } from '../../../services/hooks/List/useGetListById'
import CustomDialog from '../../Dialog/Index'
import { StyledAddIcon, StyledRemoveIcon } from '../../listCard/styles'
import {
    DescriptionParagraph,
    FirstInfoBox,
    InfoP,
    KeyWords,
    SecondInfoBox,
    ThirdInfoBox,
} from '../styles'

type Props = {
    part: Item
    icon?: string
}

export const Searchinfo = ({ part, icon }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const { snackbar } = useSnackBar()
    const [open, setOpen] = useState(false)
    const { listId } = useParams()
    const navigate = useNavigate()
    const { data: list, isFetching } = useGetListById(listId!)
    const {
        mutate: mutateAddItemToList,
        isSuccess: addItemSuccess,
        data,
    } = useAddItemsToList()
    const {
        mutate: mutateRemoveItemFromList,
        isSuccess: removeItemSuccess,
        data: removeData,
    } = useRemoveItemsFromList()

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
                    {icon === 'add' && (
                        <StyledAddIcon
                            style={{
                                fontSize: '25px',
                                ...(addItemSuccess && { color: 'green' }),
                            }}
                            onClick={(e) =>
                                handleAdd(e, {
                                    itemId: part.id,
                                    listId: listId!,
                                })
                            }
                        ></StyledAddIcon>
                    )}

                    {icon === 'remove' && (
                        <StyledRemoveIcon
                            style={{ fontSize: '25px' }}
                            onClick={handleClickOpen}
                        ></StyledRemoveIcon>
                    )}
                </div>
                <InfoP>
                    <KeyWords>Location</KeyWords>
                    {part.location?.name || 'Location'}
                </InfoP>
                <InfoP>
                    <KeyWords>Vendor</KeyWords>
                    {part.vendor?.name || ''}
                </InfoP>
                <InfoP>
                    <KeyWords>
                        {part.updatedDate ? 'Last updated' : 'Created on'}
                    </KeyWords>
                    {format(
                        new Date(part.updatedDate || part.createdDate),
                        'yyyy-MM-dd HH:mm:ss'
                    ).toString()}
                </InfoP>
            </ThirdInfoBox>
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
