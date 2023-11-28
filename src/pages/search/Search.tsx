import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { LoadMoreButton, SearchContainer } from "./styles"
import { Item } from "../../services/apiTypes"
import { Link } from "react-router-dom"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"
import apiService, { ApiService } from "../../services/api"
import Dropdown from "../../components/dropdown/Dropdown"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [items, setItems] = useState<Item[]>([])
    const { width } = useWindowDimensions()
    const api = apiService();
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState<Boolean>(false);
    
    const handleScroll = async () => {
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
            setPage(page + 1)
        }
            return
    };
    
    const getItems = async (search: string, page: number) => {
        setIsFetching(true);
        const response = await api.getItemsBySearchString(encodeURIComponent(search), page);
        setItems([...items].concat(response))
        setIsFetching(false)
    }

    useEffect(() => {
        // window.addEventListener(`scroll`, handleScroll)
        // return () => { window.removeEventListener(`scroll`, handleScroll) }
    }, [])

    useEffect(() => {
        if (searchTerm.length <= 1) {
            setItems([]);
            return;
        }
        (async () => {
            await getItems(searchTerm, page )
            window.addEventListener(`scroll`, handleScroll)
        })()

        return () => { window.removeEventListener(`scroll`, handleScroll) }
    }, [searchTerm, page])

    return (
        <SearchContainer>
            <SearchBar setSearchTerm={setSearchTerm} />

            {isFetching ? <div>Fetching...</div> :
                <></>
            }
            {items?.map((part: Item) => (
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${part.wpId}`} key={part.wpId} >{width > 800 ? <SearchResultCard part={part} /> : <SearchResultCardCompact part={part} />}</Link>
            ))}
        </SearchContainer>
    )
}

export default Search
