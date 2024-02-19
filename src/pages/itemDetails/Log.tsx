import { useEffect, useRef } from 'react';
import { Item } from '../../services/apiTypes';
import { useGetLogEntriesByItemId } from '../../services/hooks/logEntry/useGetLogEntriesByItemId';
import { StyledScrollContainer } from './styles';
import { Entry } from '../../components/ItemDetails/Entry';

export const Log = ({ item }: { item: Item }) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetLogEntriesByItemId(
        item.id
    );

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
        <div>
            <h4>Log</h4>
            <StyledScrollContainer>
                {data?.pages.map((page, i) =>
                    page.map((entry, index) => (
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
                            <Entry entry={entry} />
                        </div>
                    ))
                )}
            </StyledScrollContainer>
        </div>
    );
};
