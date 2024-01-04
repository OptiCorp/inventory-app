import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Button } from '../../../../components/Button/SubmitButton'
import UmAppContext from '../../../../contexts/UmAppContext'
import { useSnackBar } from '../../../../hooks'
import { Item, UpdateList } from '../../../../services/apiTypes'
import { useGetItemsNotInListInfinite } from '../../../../services/hooks/Items/useGetItemsNotInListInfinite'
import { useGetListById } from '../../../../services/hooks/List/useGetListById'
import { useUpdateList } from '../../../../services/hooks/List/useUpdateList'
import { COLORS } from '../../../../style/GlobalStyles'
import { GlobalSpinnerContainer, Spinner } from '../../../search/styles'
import { ListHeader } from '../../ListHeader'
import { SideList } from '../../Sidelist/SideList'
import {
    ButtonWrapCompact,
    FlexWrapperCompact,
    ListContainerCompact,
} from './styles'

export const PhoneList = () => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const { data: list, isFetching } = useGetListById(listId!)
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const {
        mutate: updateList,
        status: listUpdateStatus,
        data,
    } = useUpdateList(listId!)
    const { snackbar } = useSnackBar()
    const navigate = useNavigate()
    const handleSave = () => {
        var save: UpdateList = { id: list!.id, title: list!.title }
        updateList(save, {
            onSuccess: (data) => {
                setSnackbarText(`${list!.title} was saved`)
                navigate('/makelist')
                if (data.status >= 400) {
                    setSnackbarSeverity('error')
                    setSnackbarText(`${data.statusText}, please try again.`)
                }
            },
        })
    }
    const {
        data: items,
        isLoading,
        fetchNextPage,
    } = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!)
    return (
        <>
            {list && (
                <>
                    <FlexWrapperCompact>
                        <ListHeader list={list} />

                        {list?.items ? (
                            <ListContainerCompact>
                                {list.items.map((item: Item) => (
                                    <SideList part={item} key={item.id} />
                                ))}
                            </ListContainerCompact>
                        ) : null}
                        <ButtonWrapCompact>
                            <Button
                                backgroundColor={`${COLORS.secondary}`}
                                color={`${COLORS.primary}`}
                                onClick={handleSave}
                            >
                                Save list
                            </Button>
                            <Button
                                backgroundColor={`${COLORS.secondary}`}
                                color={`${COLORS.primary}`}
                            >
                                Export
                            </Button>
                        </ButtonWrapCompact>
                    </FlexWrapperCompact>
                    {snackbar}
                    {(isLoading || isFetching) && (
                        <GlobalSpinnerContainer>
                            <Spinner />
                        </GlobalSpinnerContainer>
                    )}
                </>
            )}
        </>
    )
}
