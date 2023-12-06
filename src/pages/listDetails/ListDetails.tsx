import SearchBar from '../../components/searchBar/SearchBar'
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {
    Container,
    GlobalSpinnerContainer,
    SearchContainer,
    Spinner
} from "../search/styles.ts";
import {Item} from "../../services/apiTypes.ts";
import { ListTitle, FlexWrapper } from "./styles.ts";
import {useGetListById} from "../../services/hooks/useGetListById.tsx";
import SearchResultCard from "../../components/searchResultCard/SearchResultCard.tsx";
import SearchResultCardCompact from "../../components/searchResultCard/SearchInfoCompact.tsx";
import {useWindowDimensions} from "../../hooks";
import {useDebounce} from "usehooks-ts";
import {useGetItems} from "../../services/hooks/useGetItems.tsx";

const ListDetails = () => {
    const { listId } = useParams()
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const { width } = useWindowDimensions()
    
    const {
        data: list,
        isFetching,
    } = useGetListById(listId!)

    const { 
        data: items = [],
        isLoading
    } = useGetItems(debouncedSearchTerm)

    const filteredItems = items.filter(item => !list.items.some((listItem: Item) => listItem.id === item.id) && !item.listId);
    
    return (
        <>
            <SearchContainer>
                {list ? 
                    <>
                <ListTitle>{list.title}, {list.createdDate.split(" ")[0]}</ListTitle>
                <FlexWrapper>
                    {list.items ? 
                        <>
                        {list.items.map((item: Item) =>
                                width > 800 ? (
                                    <SearchResultCard part={item} icon={"remove"} />
                                ) : (
                                    <SearchResultCardCompact part={item} icon={"remove"} />
                                )
                            )}
                        </>: null
                    }
                </FlexWrapper>
                    </> : null
                }
                
                <SearchBar
                    setSearchTerm={setSearchTerm}
                    searchTerm={searchTerm}
                    placeholder={"Search for ID, description, PO number or S/N"}
                />
                
                <Container>
                    {filteredItems.map((part: Item) =>
                            width > 800 ? (
                                <SearchResultCard part={part} icon={"add"} />
                            ) : (
                                <SearchResultCardCompact part={part} icon={"add"} />
                            )
                        )}
                </Container>
                
                {(isLoading || isFetching) && (
                    <GlobalSpinnerContainer>
                        <Spinner />
                    </GlobalSpinnerContainer>
                )}

            </SearchContainer>
        </>
    )
}

export default ListDetails
