import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import SearchBar from '../../../components/searchBar/SearchBar'
import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact'
import { useSnackBar, useWindowDimensions } from '../../../hooks'
import { Item } from '../../../services/apiTypes'
import { useGetItemsNotInListInfinite } from '../../../services/hooks/Items/useGetItemsNotInListInfinite'
import { useGetListById } from '../../../services/hooks/List/useGetListById'
import { useUpdateList } from '../../../services/hooks/List/useUpdateList'
import { GlobalSpinnerContainer, Spinner } from '../../search/styles'
import { PhoneContainer, PhoneListTitle } from './styles'

type Props = {
    part: Item
}

export const AddMoreCompact = () => {
    const { snackbar } = useSnackBar()
    const [searchTerm, setSearchTerm] = useState('')
    const { width } = useWindowDimensions()
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { listId } = useParams()
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

    const {
        mutate: updateList,
        status: listUpdateStatus,
        data,
    } = useUpdateList(listId!)
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
    const { data: list, isFetching } = useGetListById(listId!)
    return (
        <>
            <PhoneListTitle>Add items</PhoneListTitle>

            <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                placeholder={'Search for ID, description, PO number or S/N'}
            />
            <PhoneContainer>
                {items?.pages.map((page, i) =>
                    page.map((item, index) => (
                        <div
                            id={
                                i === items.pages.length - 1 &&
                                index === page.length - 1
                                    ? 'lastItem'
                                    : ''
                            }
                        >
                            <SearchResultCardCompact part={item} icon={'add'} />
                        </div>
                    ))
                )}
            </PhoneContainer>
            {snackbar}
            {(isLoading || isFetching) && (
                <GlobalSpinnerContainer>
                    <Spinner />
                </GlobalSpinnerContainer>
            )}
        </>
    )
}
