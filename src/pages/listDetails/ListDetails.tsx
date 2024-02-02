import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import { Button } from '../../components/Button/Button.tsx';
import ItemCard from '../../components/ItemCard/ItemCard.tsx';
import SearchResultCardCompact from '../../components/ItemCard/SearchInfoCompact.tsx';
import SearchBar from '../../components/SearchBar/SearchBar.tsx';
import AppContext from '../../contexts/AppContext.tsx';
import { useSnackBar, useWindowDimensions } from '../../hooks';
import { Item, UpdateList } from '../../services/apiTypes.ts';
import { useGetListById } from '../../services/hooks/list/useGetListById.tsx';

import { GlobalSpinner } from '../../components/GlobalSpinner/GlobalSpinner.tsx';

import { useUpdateList } from '../../services/hooks/list/useUpdateList.tsx';
import { Container } from '../search/styles.ts';
import { ListHeader } from './ListHeader.tsx';
import { SideList } from './sidelist/SideList.tsx';
import {
    ButtonWrap,
    FlexWrapper,
    ListContainer,
    ListTitle,
    SearchContainerList,
    SearchResultsContainer,
} from './styles.ts';
import { useGetItemsInfinite } from '../../services/hooks/items/useGetItemsInfinite.tsx';
import useExportToExcel from '../../services/hooks/export/useExportToExcel.ts';

const ListDetails = () => {
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    const { listId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    const { data: list, isFetching } = useGetListById(listId!);
    const { snackbar } = useSnackBar();
    const { data: items, isLoading, fetchNextPage } = useGetItemsInfinite(debouncedSearchTerm);
    const { exportToExcel } = useExportToExcel();

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            fetchNextPage().catch((error) => {
                console.error('Failed to fetch next page: ', error);
            });
        }
    };
    const { mutate: updateList } = useUpdateList(listId!);
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

    const handleSave = () => {
        const save: UpdateList = { id: list!.id, title: list!.title };
        updateList(save, {
            onSuccess: (data) => {
                setSnackbarText(`${list!.title} was saved`);
                navigate('/makelist');
                if (data.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${data.statusText}, please try again.`);
                }
            },
        });
    };

    return (
        <>
            <SearchContainerList>
                <SearchResultsContainer>
                    <ListTitle>Add items</ListTitle>
                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        placeholder={'Search for ID, serial number or description'}
                    />
                    <Container>
                        {items?.pages.map((page, i) =>
                            page.map((item, index) =>
                                width > 800 ? (
                                    <div
                                        key={index}
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <ItemCard item={item} icon={'add'} />
                                    </div>
                                ) : (
                                    <div
                                        key={index}
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <SearchResultCardCompact item={item} icon={'add'} />
                                    </div>
                                )
                            )
                        )}
                    </Container>
                </SearchResultsContainer>
                {list ? (
                    <>
                        <FlexWrapper>
                            <ListHeader list={list} />

                            {list.items ? (
                                <ListContainer>
                                    {list.items.map((item: Item) => (
                                        <SideList item={item} key={item.id} />
                                    ))}
                                </ListContainer>
                            ) : null}
                            <ButtonWrap>
                                <Button variant="white" onClick={handleSave}>
                                    Save list
                                </Button>
                                <Button onClick={() => exportToExcel(list.items)} variant="black">
                                    Export
                                </Button>
                            </ButtonWrap>
                        </FlexWrapper>
                    </>
                ) : null}
                {snackbar}
                {(isLoading || isFetching) && <GlobalSpinner />}
            </SearchContainerList>
        </>
    );
};

export default ListDetails;
