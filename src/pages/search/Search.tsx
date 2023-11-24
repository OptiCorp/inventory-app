import {useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { Container,SearchContainer} from "./styles"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"
import { useGetItems } from "../../services/hooks/useGetItems"



const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const {data: items = [], isFetching, isLoading, error} = useGetItems(searchTerm)

    const { width } = useWindowDimensions()
    const [showMore, setShowMore] = useState(10);

    return (
        <SearchContainer>
            <SearchBar setSearchTerm={setSearchTerm} />

            {isFetching ? <div>Fetching...</div> :
                <></>
            }
            <Container>
             {items.slice(0, showMore)?.map((part: any) => (

                     
                            width > 800 ? <SearchResultCard part={part} /> : <SearchResultCardCompact part={part} />)
                    )}
            </Container>
          
        </SearchContainer>
    )
}

export default Search
