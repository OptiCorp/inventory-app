import React, { useContext, useState } from 'react'
import Select from 'react-select'
import { useGetItemsInfinite } from '../../../services/hooks/Items/useGetItemsInfinite'
import { useDebounce } from 'usehooks-ts'
import { Item } from '../../../services/apiTypes'
import { Box, ClickAwayListener } from '@mui/material'
import { Edit, LabelContainer } from '../PartInfo/styles'
import { useUpdateItem } from '../../../services/hooks/Items/useUpdateItem'
import UmAppContext from '../../../contexts/UmAppContext'
import { useNavigate } from 'react-router-dom'
import { useRemoveParentIdFromItem } from '../../../services/hooks/Items/useRemoveParentIdFromItem'
import {
    AddChildItemIds,
    useAddChildItemToParent,
} from '../../../services/hooks/Items/useAddChildItemToParent'
import EditIcon from '@mui/icons-material/Edit'

import {
    AccessibleButtonWrapper,
    AddIcon,
    ChildItemContainer,
    ChildItemSearchContainer,
    CustomRemoveIcon,
    FlexContainer,
    LinkElement,
} from './styles'

export const Hierarchy = ({ item }: { item: Item }) => {
    const { currentUser, setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedId, setSelectedId] = useState(item.wpId)
    const [selectedChildItem, setSelectedChildItem] = useState({
        childItemId: '',
        childItemWpId: '',
    })
    const [isOpen, setIsOpen] = useState({
        parent: false,
        child: false,
    })
    const debouncedSearchTerm = useDebounce(searchTerm, 1000)
    const { data, isLoading, fetchNextPage } = useGetItemsInfinite(searchTerm)
    const { mutate: mutateUpdateItem } = useUpdateItem(item.id, currentUser!.id)
    const { mutate: mutateRemoveParentFromItem } = useRemoveParentIdFromItem()
    const { mutate: mutateAddChildItemToParent } = useAddChildItemToParent()
    const navigate = useNavigate()

    const filteredWpIds = data?.pages
        .flatMap((el) => el)
        .filter((el) => el.wpId?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ?? false)
        .map((el) => ({ label: el.wpId, value: el }))

    const handleBlur = () => {
        if (selectedId === item.wpId) return
        mutateUpdateItem(
            {
                ...item,
                wpId: selectedId,
            },
            {
                onSuccess: (data) => {
                    if (data.status >= 400 && data.status < 500) {
                        setSnackbarSeverity('error')
                        setSnackbarText(`${data.statusText}, please try again.`)
                        return
                    } else if (data.status >= 500) {
                        setSnackbarSeverity('error')
                        setSnackbarText(
                            `Something went wrong on our end, refresh page and try again later.`
                        )
                        return
                    } else {
                        setSnackbarText(`WP Id was changed to ${selectedId}`)
                    }
                },
            }
        )
    }

    const handleAddChildToParent = (ids: AddChildItemIds) => {
        mutateAddChildItemToParent(ids, {
            onSuccess: (data) => {
                if (data.status >= 400 && data.status < 500) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                    return
                } else if (data.status >= 500) {
                    setSnackbarSeverity('error')
                    setSnackbarText(
                        `Something went wrong on our end, refresh page and try again later.`
                    )
                    return
                } else {
                    setSnackbarText(`Item added`)
                }
            },
        })
    }

    const handleRemoveItem = (id: string) => {
        mutateRemoveParentFromItem(id, {
            onSuccess: (data) => {
                if (data.status >= 400 && data.status < 500) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                    return
                } else if (data.status >= 500) {
                    setSnackbarSeverity('error')
                    setSnackbarText(
                        `Something went wrong on our end, refresh page and try again later.`
                    )
                    return
                } else {
                    setSnackbarText(`Item removed`)
                }
            },
        })
    }

    const clickAwayHandlerParent = () => {
        setIsOpen((prev) => ({ ...prev, parent: false }))
    }

    const clickAwayHandlerChild = () => {
        setIsOpen((prev) => ({ ...prev, child: false }))
        setSelectedChildItem({
            childItemId: '',
            childItemWpId: '',
        })
    }

    return (
        <div>
            <ClickAwayListener onClickAway={clickAwayHandlerParent}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{`This ${item.type} is a part of:`}</strong>
                        </label>
                        <Edit onClick={() => setIsOpen((prev) => ({ ...prev, parent: true }))} />
                    </LabelContainer>
                    {isOpen.parent && (
                        <Select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    maxWidth: '400px',
                                }),
                            }}
                            onInputChange={(value) => setSearchTerm(value)}
                            onMenuScrollToBottom={() => fetchNextPage()}
                            options={filteredWpIds}
                            isLoading={isLoading}
                            placeholder="Search by wpid..."
                            onChange={(value) => setSelectedId(value!.value.wpId)}
                            onBlur={handleBlur}
                        />
                    )}
                    {!isOpen.parent && (
                        <>
                            {item.parent && (
                                <LinkElement onClick={() => navigate(`/${item.parent?.id}`)}>
                                    {item.parent?.wpId}
                                </LinkElement>
                            )}
                        </>
                    )}
                </Box>
            </ClickAwayListener>
            <ClickAwayListener onClickAway={clickAwayHandlerChild}>
                <Box>
                    <FlexContainer>
                        {item.children?.map((childItem) => {
                            return (
                                <ChildItemContainer>
                                    <LinkElement onClick={() => navigate(`/${childItem.id}`)}>
                                        {childItem.wpId}
                                    </LinkElement>

                                    {isOpen.child && (
                                        <AccessibleButtonWrapper
                                            onClick={() => handleRemoveItem(childItem.id)}
                                        >
                                            <CustomRemoveIcon />
                                        </AccessibleButtonWrapper>
                                    )}
                                </ChildItemContainer>
                            )
                        })}
                        {!isOpen.child && !!item.children?.length && (
                            <AccessibleButtonWrapper
                                onClick={() => setIsOpen((prev) => ({ ...prev, child: true }))}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    margin: 0,
                                }}
                            >
                                <EditIcon />
                            </AccessibleButtonWrapper>
                        )}
                    </FlexContainer>

                    <ChildItemSearchContainer>
                        <Select
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    minWidth: '400px',
                                    maxWidth: '400px',
                                }),
                            }}
                            options={filteredWpIds}
                            onInputChange={(value) => setSearchTerm(value)}
                            isLoading={isLoading}
                            onMenuScrollToBottom={() => fetchNextPage()}
                            placeholder="Search for item to add.."
                            onChange={(value) =>
                                setSelectedChildItem({
                                    childItemId: value!.value.id,
                                    childItemWpId: value!.value.wpId,
                                })
                            }
                        />

                        <AddIcon
                            disabled={selectedChildItem.childItemWpId.length <= 0}
                            onClick={() => {
                                if (selectedChildItem.childItemWpId.length <= 0) return
                                handleAddChildToParent({
                                    itemId: item.id,
                                    childItemId: selectedChildItem.childItemId,
                                })
                                setSelectedChildItem({
                                    childItemId: '',
                                    childItemWpId: '',
                                })
                            }}
                        />
                    </ChildItemSearchContainer>
                </Box>
            </ClickAwayListener>
        </div>
    )
}
