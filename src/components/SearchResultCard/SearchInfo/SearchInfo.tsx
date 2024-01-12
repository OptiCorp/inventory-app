import { format } from 'date-fns'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { MutateItemList } from '../../../services/apiTypes'

import { useAddItemsToList } from '../../../services/hooks/Items/useAddItemsToList'
import { useRemoveItemsFromList } from '../../../services/hooks/Items/useRemoveItemsFromList'

import { useSnackBar } from '../../../hooks'
import { useGetListById } from '../../../services/hooks/List/useGetListById'
import CustomDialog from '../../CustomDialog/CustomDialog'
import {
    StyledAddIcon,
    StyledInfoIcon,
    StyledRemoveIcon,
} from '../../ListCard/styles'

type Props = {
    part: Item
    icon?: string
}
export const Searchinfo = ({ part, icon }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const { snackbar } = useSnackBar()
    const [open, setOpen] = useState(false)
    const [alreadyAdded, setAlreadyAdded] = useState(false)
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
        const alreadyAdded = list?.items.some((item) => item.id === part.id)
        if (alreadyAdded) {
            {
                setAlreadyAdded(true)
            }
            setSnackbarSeverity('error')
            setSnackbarText('already in list')
        }
        mutateAddItemToList(ids, {
            onSuccess: (data) => {
                if (alreadyAdded) return
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
                {' '}
                <div style={{ alignSelf: 'flex-end' }}>
                    {icon === 'add' ? (
                        <StyledAddIcon
                            alreadyAdded={alreadyAdded}
                            active={addItemSuccess}
                            onClick={(e) =>
                                handleAdd(e, {
                                    itemId: part.id,
                                    listId: listId!,
                                })
                            }
                        ></StyledAddIcon>
                    ) : (
                        icon === 'remove' && (
                            <StyledRemoveIcon
                                style={{ fontSize: '25px' }}
                                onClick={handleClickOpen}
                            ></StyledRemoveIcon>
                        )
                    )}
                </div>{' '}
                {location.pathname.includes('/makelist') && (
                    <StyledInfoIcon
                        onClick={() => {
                            navigate(`/${part.id}`)
                        }}
                    ></StyledInfoIcon>
                )}
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
