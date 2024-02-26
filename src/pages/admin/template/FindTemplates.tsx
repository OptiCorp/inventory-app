import { useDebounce } from 'usehooks-ts';
import { useGetItemTemplatesInfinite } from '../../../services/hooks/template/useGetItemTemplatesInfinite';
import { useEffect, useRef, useState } from 'react';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { COLORS } from '../../../style/GlobalStyles';

export const FindTemplates = () => {
    const navigate = useNavigate();
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
        <div style={{ padding: '16px' }}>
            <Box
                sx={{
                    display: 'flex',
                    /* button: {
                        flex: 'none',
                    }, */
                }}
            >
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder="Search for type or description"
                />

                <Button
                    sx={{
                        whiteSpace: 'nowrap',
                        minWidth: 'max-content',
                    }}
                    onClick={() => navigate('/admin/add-template')}
                    variant="contained"
                >
                    Add Template
                </Button>
            </Box>

            {isLoading && <GlobalSpinner />}

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {data?.pages.map((page, i) =>
                    page.map((template, index) => (
                        <div
                            key={index}
                            style={{
                                display: 'flex',
                                gap: '16px',
                                flexDirection: 'column',
                                margin: '32px',
                            }}
                            ref={
                                i === data.pages.length - 1 &&
                                index === page.length - 1 &&
                                page.length >= 10
                                    ? lastItemRef
                                    : undefined
                            }
                        >
                            <Template template={template} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

type TemplateProps = {
    template: {
        type: string;
        description: string;
        category: {
            name: string;
        };
    };
};

export const Template = ({ template }: TemplateProps) => {
    return (
        <div
            style={{
                display: 'flex',
                background: COLORS.lightestGray,
                boxShadow: '2px 4px 4px 0 rgba(0, 0, 0, 0.2)',
                width: '550px',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2">TYPE</Typography>
                <Typography>{template.type}</Typography>
                <Typography variant="body2">CATEGORY</Typography>
                <Typography>{template.category?.name}</Typography>
            </div>
            <Typography>{template.description}</Typography>
        </div>
    );
};
