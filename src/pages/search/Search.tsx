import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce, useLocalStorage } from 'usehooks-ts'
import SearchBar from '../../components/searchBar/SearchBar'
import { useWindowDimensions } from '../../hooks'
import { useGetItems } from '../../services/hooks/useGetItems'

import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard'
import {
    Container,
    GlobalSpinnerContainer,
    RecentSearchContainer,
    RecentTitle,
    SearchContainer,
    Spinner,
    StyledSearchedLink,
} from './styles'

const Search = () => {
    const { searchParam } = useParams<{ searchParam: string }>()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { data: items = [], isLoading } = useGetItems(debouncedSearchTerm)
    const { width } = useWindowDimensions()
    const [searches, setSearches] = useLocalStorage<string[]>(
        'recent_searches',
        []
    )
    useEffect(() => {
        setSearchTerm((prev) => searchParam || prev)
    }, [searchParam])

    useEffect(() => {
        if (!debouncedSearchTerm) return
        setSearches((prev) => [searchTerm, ...prev.slice(0, 4)])
    }, [debouncedSearchTerm])

    return (
        <>
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={"Search for ID, description, PO number or S/N"}
                />

                {isLoading && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}

                <Container>
                    {items
                        .slice(0)
                        ?.map((part: any) =>
                            width > 800 ? (
                                <SearchResultCard part={part} />
                            ) : (
                                <SearchResultCardCompact part={part} />
                            )
                        )}
                </Container>

                {!searchTerm ? (
                    <RecentSearchContainer>
                        <RecentTitle>Recent Searches</RecentTitle>

                        {searches.map((search, index) => (
                            <StyledSearchedLink key={index} to={`/search/${search}`}>
                                {search}
                            </StyledSearchedLink>
                        ))}
                    </RecentSearchContainer>
                ) : null}
            </SearchContainer>
        </>
    )
}

export default Search
