import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Button } from '../../components/Button/SubmitButton.tsx'
import SearchBar from '../../components/searchBar/SearchBar'
import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact.tsx'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard.tsx'
import { useSnackBar, useWindowDimensions } from '../../hooks'
import { Item, UpdateList } from '../../services/apiTypes.ts'
import { useGetItemsNotInListInfinite } from '../../services/hooks/Items/useGetItemsNotInListInfinite.tsx'
import { useGetListById } from '../../services/hooks/List/useGetListById.tsx'
import { COLORS } from '../../style/GlobalStyles.ts'
import { Container, GlobalSpinnerContainer, Spinner } from '../search/styles.ts'
import { ListHeader } from './ListHeader.tsx'
import { SideList } from './Sidelist/SideList.tsx'
import {
    ButtonWrap,
    FlexWrapper,
    ListContainer,
    ListTitle,
    SearchContainerList,
    SearchResultsContainer,
} from './styles.ts'
import { useUpdateList } from '../../services/hooks/List/useUpdateList.tsx'

const ListDetails = () => {
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { width } = useWindowDimensions()
const navigate = useNavigate()
    const { data: list, isFetching } = useGetListById(listId!)
 const { snackbar, setSnackbarText, setSnackbarSeverity } = useSnackBar()
    const {
        data: items,
        isLoading,
        fetchNextPage,
    } = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!)

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            fetchNextPage()
        }
    }
 const { mutate: updateList, status: listUpdateStatus } = useUpdateList(listId!)
    const observer = new IntersectionObserver(handleScroll, {
        threshold: 1,
        rootMargin: '100px',
    })

    useEffect(() => {
        const lastItem = document.getElementById('lastItem')
        if (lastItem) {
            observer.observe(lastItem)
        }
        return () => {
            if (lastItem) {
                observer.unobserve(lastItem)
            }
        }
    }, [items])

     const handleSave = () => {
       
         var save: UpdateList = { id: list!.id, title: list!.title }
         updateList(save)
         navigate('/makelist')
     }

    return (
        <>
            <SearchContainerList>
                <SearchResultsContainer>
                    <ListTitle>Add items</ListTitle>

                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        placeholder={
                            'Search for ID, description, PO number or S/N'
                        }
                    />
                    <Container>
                        {items?.pages.map((page, i) =>
                            page.map((item, index) =>
                                width > 800 ? (
                                    <div
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <SearchResultCard
                                            part={item}
                                            icon={'add'}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <SearchResultCardCompact
                                            part={item}
                                            icon={'add'}
                                        />
                                    </div>
                                )
                            )
                        )}
                    </Container>
                </SearchResultsContainer>
                {list ? (
                    <>
                        <FlexWrapper>
                            <ListHeader list={list} />

                            {list.items ? (
                                <ListContainer>
                                    {list.items.map((item: Item) => (
                                        <SideList part={item} key={item.id} />
                                    ))}
                                </ListContainer>
                            ) : null}
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
                        </FlexWrapper>
                    </>
                ) : null}
                {snackbar}
                {(isLoading || isFetching) && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}
            </SearchContainerList>
        </>
    )
}

export default ListDetails
