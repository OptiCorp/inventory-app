import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';
import { SearchResultCardCompact } from '../../../components/ItemCard/SearchInfoCompact/SearchInfoCompact';

import { Box } from '@mui/material';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { useGetListById } from '../../../services/hooks/list/useGetListById';
import { PhoneContainer, PhoneListTitle } from './styles';

export const AddMoreCompact = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { listId } = useParams();
    const { data: items, isLoading, fetchNextPage } = useGetItemsInfinite(debouncedSearchTerm);

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
    }, [items]);
    const { isFetching } = useGetListById(listId!);
    return (
        <>
            <PhoneListTitle>Add items</PhoneListTitle>
            <Box padding="0 16px">
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={'Search for ID, serial number or description'}
                />
            </Box>
            <PhoneContainer>
                {items?.pages.map((page, i) =>
                    page.map((item, index) => (
                        <div
                            key={index}
                            id={
                                i === items.pages.length - 1 && index === page.length - 1
                                    ? 'lastItem'
                                    : ''
                            }
                        >
                            <SearchResultCardCompact item={item} icon={'add'} />
                        </div>
                    ))
                )}
            </PhoneContainer>

            {(isLoading || isFetching) && <GlobalSpinner />}
        </>
    );
};
