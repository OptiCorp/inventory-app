import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce, useLocalStorage } from 'usehooks-ts'
import SearchBar from '../../components/searchBar/SearchBar'
import { useWindowDimensions } from '../../hooks'

import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard'
import { useGetItemsInfinite } from '../../services/hooks/Items/useGetItemsInfinite'
import {
    Container,
    GlobalSpinnerContainer,
    RecentSearchContainer,
    RecentTitle,
    SearchContainer,
    SpanMargin,
    Spinner,
    StyledSearchedLink,
} from './styles'

const Search = () => {
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data, isLoading, fetchNextPage } = useGetItemsInfinite(debouncedSearchTerm)
    const { width } = useWindowDimensions()
    const [searches, setSearches] = useLocalStorage<string[]>('recent_searches', [])

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
    }, [data])

    useEffect(() => {
        setSearchTerm((prev) => searchParam || prev)
    }, [searchParam])

    useEffect(() => {
        if (searchTerm !== '' && !searches.includes(searchTerm)) {
            setSearches((prev) => [searchTerm, ...prev.slice(0, 9)])
        }
    }, [debouncedSearchTerm])

    return (
        <>
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={'Search for ID, description, PO number or S/N'}
                />

                {isLoading && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}

                <Container>
                    {data?.pages.map((page, i) =>
                        page.map((item, index) =>
                            width > 800 ? (
                                <div
                                    id={
                                        i === data.pages.length - 1 && index === page.length - 1
                                            ? 'lastItem'
                                            : ''
                                    }
                                >
                                    <SearchResultCard part={item} />
                                </div>
                            ) : (
                                <div
                                    id={
                                        i === data.pages.length - 1 && index === page.length - 1
                                            ? 'lastItem'
                                            : ''
                                    }
                                >
                                    <SearchResultCardCompact part={item} />
                                </div>
                            )
                        )
                    )}
                </Container>

                {!searchTerm ? (
                    <RecentSearchContainer>
                        <RecentTitle>Recent Searches</RecentTitle>

                        {searches.map((search, index) => (
                            <SpanMargin>
                                <StyledSearchedLink key={index} to={`/search/${search}`}>
                                    {search}
                                </StyledSearchedLink>
                            </SpanMargin>
                        ))}
                    </RecentSearchContainer>
                ) : null}
            </SearchContainer>
        </>
    )
}

export default Search
