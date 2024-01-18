import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';
import SearchResultCardCompact from '../../../components/ResultSearchCard/SearchInfo/SearchInfoCompact';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { useSnackBar } from '../../../hooks';
import { useGetListById } from '../../../services/hooks/list/useGetListById';

import { useGetItemsNotInListInfinite } from '../../../services/hooks/items/useGetItemsNotInListInfinite';
import { PhoneContainer, PhoneListTitle } from './styles';

export const AddMoreCompact = () => {
    const { snackbar } = useSnackBar();
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { listId } = useParams();
    const {
        data: items,
        isLoading,
        fetchNextPage,
    } = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!);

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
    const { data: list, isFetching } = useGetListById(listId!);
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
                            key={index}
                            id={
                                i === items.pages.length - 1 && index === page.length - 1
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
            {(isLoading || isFetching) && <GlobalSpinner />}
        </>
    );
};
