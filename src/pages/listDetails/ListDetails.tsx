import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import SearchBar from '../../components/searchBar/SearchBar'
import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact.tsx'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../hooks'
import { Item } from '../../services/apiTypes.ts'
import { useGetItemsNotInListInfinite } from '../../services/hooks/Items/useGetItemsNotInListInfinite.tsx'
import { useGetListById } from '../../services/hooks/List/useGetListById.tsx'
import { Container, GlobalSpinnerContainer, Spinner } from '../search/styles.ts'
import { SideList } from './Sidelist/SideList.tsx'
import { DeleteIcon, EditIcon, InfoIcon } from './Sidelist/styles.ts'
import {
    FlexWrapper,
    Header,
    ListContainer,
    ListTitle,
    SearchContainerList,
    SearchResultsContainer,
} from './styles.ts'

const ListDetails = () => {
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { width } = useWindowDimensions()

    const { data: list, isFetching } = useGetListById(listId!)

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
                            <Header>
                                <ListTitle>
                                    {list.title},{' '}
                                    {format(
                                        new Date(list.createdDate),
                                        'dd-MM-yyyy'
                                    ).toString()}
                                </ListTitle>
                                <InfoIcon />
                                <EditIcon />
                                <DeleteIcon />
                            </Header>{' '}
                            {list.items ? (
                                <ListContainer>
                                    {list.items.map((item: Item) => (
                                        <SideList part={item} />
                                    ))}
                                </ListContainer>
                            ) : null}
                        </FlexWrapper>
                    </>
                ) : null}

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
