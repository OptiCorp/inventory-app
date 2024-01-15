import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useWindowDimensions } from '../../hooks';

import { GlobalSpinner } from '../../components/GlobalSpinner/GlobalSpinner';
import SearchResultCard from '../../components/ResultSearchCard/ResultSearchCard';
import SearchResultCardCompact from '../../components/ResultSearchCard/SearchInfoCompact';
import { useGetItemsInfinite } from '../../services/hooks/items/useGetItemsInfinite';
import {
    Container,
    RecentSearchContainer,
    RecentTitle,
    SearchContainer,
    SpanMargin,
    StyledSearchedLink,
} from './styles';

type StateType = {
    resetInputField?: boolean;
};

const Search = () => {
    const { searchParam } = useParams<{ searchParam: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data, isLoading, fetchNextPage } = useGetItemsInfinite(debouncedSearchTerm);
    const { width } = useWindowDimensions();
    const [searches, setSearches] = useLocalStorage<string[]>('recent_searches', []);
    const location = useLocation();
    const state: StateType = location.state as StateType;
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            fetchNextPage().catch((error) => {
                console.error('Failed to fetch next page: ', error);
            });
        }
    };

    const observer = new IntersectionObserver(handleScroll, {
        threshold: 1,
        rootMargin: '100px',
    });

    useEffect(() => {
        const lastItem = document.getElementById('lastItem');
        if (lastItem) {
            observer.observe(lastItem);
        }
        return () => {
            if (lastItem) {
                observer.unobserve(lastItem);
            }
        };
    }, [data]);

    useEffect(() => {
        setSearchTerm((prev) => searchParam ?? prev);
    }, [searchParam]);

    useEffect(() => {
        if (searchTerm !== '' && !searches.includes(searchTerm)) {
            setSearches((prev) => [searchTerm, ...prev.slice(0, 9)]);
        } else if (state?.resetInputField) {
            setSearchTerm('');
        }
    }, [debouncedSearchTerm, state]);

    return (
        <>
            <SearchContainer>
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={'Search for ID, description, PO number or S/N'}
                />

                {isLoading && <GlobalSpinner />}

                <Container>
                    {data?.pages.map((page, i) =>
                        page.map((item, index) =>
                            width > 800 ? (
                                <div
                                    key={index}
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
                                    key={index}
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
                            <SpanMargin key={index}>
                                <StyledSearchedLink to={`/search/${search}`}>
                                    {search}
                                </StyledSearchedLink>
                            </SpanMargin>
                        ))}
                    </RecentSearchContainer>
                ) : null}
            </SearchContainer>
        </>
    );
};

export default Search;
