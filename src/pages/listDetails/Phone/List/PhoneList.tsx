import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Button } from '../../../../components/Button/SubmitButton'
import SearchResultCardCompact from '../../../../components/searchResultCard/SearchInfoCompact'
import UmAppContext from '../../../../contexts/UmAppContext'
import { useSnackBar } from '../../../../hooks'
import { Item, List, UpdateList } from '../../../../services/apiTypes'
import { useGetItemsNotInListInfinite } from '../../../../services/hooks/Items/useGetItemsNotInListInfinite'
import { useUpdateList } from '../../../../services/hooks/List/useUpdateList'
import { COLORS } from '../../../../style/GlobalStyles'
import { ListHeader } from '../../ListHeader'
import { ButtonWrapCompact, FlexWrapperCompact, ListContainerCompact } from './styles'
type Props = {
    list: List
}
export const PhoneList = ({ list }: Props) => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)

    const [searchTerm, setSearchTerm] = useState('')
    const { listId } = useParams()
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { mutate: updateList, status: listUpdateStatus, data } = useUpdateList(listId!)
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
    const {} = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!)
    return (
        <>
            {list && (
                <>
                    <FlexWrapperCompact>
                        <ListHeader list={list} />

                        {list?.items ? (
                            <ListContainerCompact>
                                {list.items.map((item: Item) => (
                                    <SearchResultCardCompact part={item} icon={'remove'} />
                                    // <SideList part={item} key={item.id} />
                                ))}
                            </ListContainerCompact>
                        ) : null}
                        <ButtonWrapCompact>
                            <Button
                                backgroundColor={`${COLORS.secondary}`}
                                color={`${COLORS.primary}`}
                            >
                                Export
                            </Button>
                            <Button
                                backgroundColor={`${COLORS.primary}`}
                                color={`${COLORS.secondary}`}
                                onClick={handleSave}
                            >
                                Save list
                            </Button>
                        </ButtonWrapCompact>
                    </FlexWrapperCompact>
                    {snackbar}
                    {/* {(isLoading || isFetching) && (
                        <GlobalSpinnerContainer>
                            <Spinner />
                        </GlobalSpinnerContainer>
                    )} */}
                </>
            )}
        </>
    )
}
