import { useDebounce } from 'usehooks-ts';
import { useGetItemTemplatesInfinite } from '../../../services/hooks/template/useGetItemTemplatesInfinite';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';
import { useParams } from 'react-router-dom';

export const FindTemplates = () => {
    const { searchParam } = useParams<{ searchParam: string }>();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useGetItemTemplatesInfinite(debouncedSearchTerm);
    console.log('data: ', data);
    console.log('search: ', searchParam);
    console.log('has next page: ', hasNextPage);
    console.log('fetching next page: ', isFetchingNextPage);

    const lastItemRef = useRef(null);

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
        const lastItem = entries[0];

        if (
            lastItem.isIntersecting &&
            lastItem.boundingClientRect.bottom <= window.innerHeight &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage().catch((error) => {
                console.error('Failed to fetch next page: ', error);
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleScroll, {
            threshold: 1,
            rootMargin: '100px',
        });
        const lastItem = lastItemRef.current;

        if (lastItem) {
            observer.observe(lastItem);
        }

        return () => {
            if (lastItem) {
                observer.unobserve(lastItem);
            }
        };
    }, [data, hasNextPage, isFetchingNextPage]);

    return (
        <>
            <SearchBar
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                placeholder="Search for type or description"
            />

            {isLoading && <GlobalSpinner />}

            <div style={{ maxHeight: '100px', overflowY: 'scroll' }}>
                {data?.pages.map((page, i) =>
                    page.map((template, index) => (
                        <div
                            key={index}
                            ref={
                                i === data.pages.length - 1 &&
                                index === page.length - 1 &&
                                page.length >= 10
                                    ? lastItemRef
                                    : undefined
                            }
                        >
                            <div style={{ display: 'flex', gap: '10px', border: '1px solid red' }}>
                                <p>{template.category.name}</p>
                                <p>{template.type}</p>
                                <p>{template.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <button onClick={() => fetchNextPage()}>Next</button>
        </>
    );
};
