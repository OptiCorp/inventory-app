import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Button } from '../../components/Button/SubmitButton.tsx'
import CustomDialog from '../../components/Dialog/Index.tsx'
import SearchBar from '../../components/searchBar/SearchBar'
import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact.tsx'
import SearchResultCard from '../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../hooks'
import { Item } from '../../services/apiTypes.ts'
import { useGetItemsNotInListInfinite } from '../../services/hooks/Items/useGetItemsNotInListInfinite.tsx'
import { useDeleteList } from '../../services/hooks/List/useDeleteList.tsx'
import { useGetListById } from '../../services/hooks/List/useGetListById.tsx'
import { COLORS } from '../../style/GlobalStyles.ts'
import { Container, GlobalSpinnerContainer, Spinner } from '../search/styles.ts'
import { SideList } from './Sidelist/SideList.tsx'
import { DeleteIcon, EditIcon, InfoIcon } from './Sidelist/styles.ts'
import {
    ButtonWrap,
    FlexContainer,
    FlexWrapper,
    Header,
    ListContainer,
    ListTitle,
    SearchContainerList,
    SearchResultsContainer,
} from './styles.ts'

const ListDetails = () => {
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { width } = useWindowDimensions()
    const { mutate, isSuccess } = useDeleteList()
    const [open, setOpen] = useState(false)
    const { data: list, isFetching } = useGetListById(listId!)

    const {
        data: items,
        isLoading,
        fetchNextPage,
    } = useGetItemsNotInListInfinite(debouncedSearchTerm, listId!)

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
    }, [items])

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        setOpen(true)
        mutate(list!.id)
        handleClose()
        console.log('fdsf' + list!.id)
    }

    return (
        <>
            <SearchContainerList>
                <SearchResultsContainer>
                    <ListTitle>Add items</ListTitle>

                    <SearchBar
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        placeholder={'Search for ID, description, PO number or S/N'}
                    />
                    <Container>
                        {items?.pages.map((page, i) =>
                            page.map((item, index) =>
                                width > 800 ? (
                                    <div
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <SearchResultCard part={item} icon={'add'} />
                                    </div>
                                ) : (
                                    <div
                                        id={
                                            i === items.pages.length - 1 &&
                                            index === page.length - 1
                                                ? 'lastItem'
                                                : ''
                                        }
                                    >
                                        <SearchResultCardCompact part={item} icon={'add'} />
                                    </div>
                                )
                            )
                        )}
                    </Container>
                </SearchResultsContainer>
                {list ? (
                    <>
                        <FlexWrapper>
                            <Header>
                                <ListTitle>
                                    {list.title},{' '}
                                    {format(new Date(list.createdDate), 'dd-MM-yyyy').toString()}
                                </ListTitle>
                                <FlexContainer>
                                    <InfoIcon />
                                    <EditIcon />
                                    <div onClick={(e) => handleOpen(e)}>
                                        <DeleteIcon />
                                    </div>
                                </FlexContainer>
                            </Header>{' '}
                            {list.items ? (
                                <ListContainer>
                                    {list.items.map((item: Item) => (
                                        <SideList part={item} />
                                    ))}
                                </ListContainer>
                            ) : null}
                            <ButtonWrap>
                                <Button
                                    backgroundColor={`${COLORS.secondary}`}
                                    color={`${COLORS.primary}`}
                                >
                                    Save list
                                </Button>
                                <Button
                                    backgroundColor={`${COLORS.secondary}`}
                                    color={`${COLORS.primary}`}
                                >
                                    Export
                                </Button>
                            </ButtonWrap>
                        </FlexWrapper>
                    </>
                ) : null}

                <CustomDialog
                    open={open}
                    onClose={handleClose}
                    title="Delete list?"
                    CancelButtonOnClick={handleClose}
                    SubmitButtonOnClick={handleDelete}
                />

                {(isLoading || isFetching) && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}
            </SearchContainerList>
        </>
    )
}

export default ListDetails
