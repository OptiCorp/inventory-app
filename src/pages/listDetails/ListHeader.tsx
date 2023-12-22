import { format } from 'date-fns'
import { useContext, useState } from 'react'

import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CustomDialog from '../../components/Dialog/Index'
import UmAppContext from '../../contexts/UmAppContext'
import { useSnackBar } from '../../hooks'
import { List, UpdateList } from '../../services/apiTypes'
import { useDeleteList } from '../../services/hooks/List/useDeleteList'
import { useUpdateList } from '../../services/hooks/List/useUpdateList'
import { DeleteIcon, EditIcon, InfoIcon } from './Sidelist/styles'
import { FlexContainer, Header, ListTitle } from './styles'

type Props = {
    list: List
}

export const ListHeader = ({ list }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const [title, setTitle] = useState(list.title)
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const { mutate, isSuccess, status, data: deleteData } = useDeleteList()
    const {
        mutate: updateList,
        status: listUpdateStatus,
        isSuccess: listSuccess,
    } = useUpdateList(list.id)
    const { snackbar } = useSnackBar()

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleOpenEdit = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation()
        setOpenEdit(true)
    }

    const handleEdit = () => {
        setOpenEdit(true)
        var newTitle: UpdateList = { id: list.id, title: title ?? list.title }
        updateList(newTitle, {
            onSuccess: (data) => {
                setSnackbarText(`${list.title} was changed to ${title}`)
                if (data.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                }
            },
        })

        handleEditClose()
    }
    const handleEditClose = () => {
        setOpenEdit(false)
    }

    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        setOpen(true)
        mutate(list.id, {
            onSuccess: (deleteData) => {
                handleClose()

                setSnackbarText(`${list.title} was deleted`)
                navigate('/makelist')
                if (deleteData.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(
                        `${deleteData.statusText}, please try again.`
                    )
                }
            },
        })
    }

    return (
        <>
            <Header>
                <ListTitle>
                    {list.title},{' '}
                    {format(
                        new Date(list.createdDate),
                        'dd-MM-yyyy'
                    ).toString()}
                </ListTitle>
                <FlexContainer>
                    <InfoIcon />
                    <div onClick={(e) => handleOpenEdit(e)}>
                        <EditIcon />
                    </div>
                    <div onClick={(e) => handleOpen(e)}>
                        <DeleteIcon />
                    </div>
                </FlexContainer>
            </Header>{' '}
            <CustomDialog
                open={open}
                onClose={handleClose}
                title="Delete list?"
                CancelButtonOnClick={handleClose}
                SubmitButtonOnClick={handleDelete}
            />
            <CustomDialog
                open={openEdit}
                onClose={handleEditClose}
                title="Edit title"
                CancelButtonOnClick={handleEditClose}
                SubmitButtonOnClick={handleEdit}
            >
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="List title"
                    defaultValue={title ?? list.title}
                    fullWidth
                    variant="standard"
                />
            </CustomDialog>
            {snackbar}
        </>
    )
}
