import { useEffect, useState } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard'
import {
    Spinner,
    Container,
    SearchContainer,
    RecentTitle,
    GlobalSpinnerContainer,
    RecentSearchContainer,
    StyledSearchedLink,
} from './styles'
import { useWindowDimensions } from '../../hooks'
import SearchResultCardCompact from '../../components/searchResultCard/SearchResultCardCompact'
import { useGetItems } from '../../services/hooks/useGetItems'
import { useDebounce, useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import { useParams } from 'react-router-dom'

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
        setSearches((prev) => [searchTerm, ...prev.slice(-4)])
    }, [debouncedSearchTerm])

    return (
        <>
            {isLoading && (
                <GlobalSpinnerContainer>
                    <Spinner />
                </GlobalSpinnerContainer>
            )}
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                />

                <Container>
                    {items
                        .slice(0)
                        ?.map((part: any) =>
                            width > 800 ? (
                                <SearchResultCard
                                    part={part}
                                    searchTerm={searchTerm}
                                />
                            ) : (
                                <SearchResultCardCompact
                                    part={part}
                                    searchTerm={searchTerm}
                                />
                            )
                        )}
                </Container>

                {!searchTerm ? (
                    <RecentSearchContainer>
                        <RecentTitle>Recent Searches</RecentTitle>

                        {searches.map((search) => (
                            <StyledSearchedLink to={`/search/${search}`}>
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
