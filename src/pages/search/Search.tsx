import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { LoadMoreButton, SearchContainer } from "./styles"
import { Item } from "../../services/apiTypes"
import { Link } from "react-router-dom"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"
import { useMutation, useQuery } from "@tanstack/react-query"
import apiService, { ApiService } from "../../services/api"
import Dropdown from "../../components/dropdown/Dropdown"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    // const [partList, setPartList] = useState<Parts>([[], [], [], []])
    const [assemblies, setAssemblies] = useState<Item[]>([])
    const [subassemblies, setSubassemblies] = useState<Item[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [units, setUnits] = useState<Item[]>([])
    const [parts, setParts] = useState<Item[]>([])
    const [definition, setDefinition] = useState<string>("")
    const { width } = useWindowDimensions()
    const api = apiService();
    const [showMore, setShowMore] = useState(10);
    const [isFetching, setIsFetching] = useState<Boolean>(false);


    useEffect(() => {
        if (searchTerm.length <= 1) {
            setItems([]);
            return;
        }
        (async () => {
            setIsFetching(true);
            const response = await api.getItemsBySearchString(encodeURIComponent(searchTerm));
            setUnits(response.filter(item => item.type === 'Unit'))
            setAssemblies(response.filter(item => item.type === 'Assembly'))
            setSubassemblies(response.filter(item => item.type === 'Subassembly'))
            setParts(response.filter(item => item.type === 'Part'))
            setIsFetching(false);
        })()
    }, [searchTerm])


    // if (isLoading) { 
    //     return <div>Loading...</div>
    // }

    return (
        <SearchContainer>
            <SearchBar setSearchTerm={setSearchTerm} />

            {isFetching ? <div>Fetching...</div> :
                <></>
            }
            <Dropdown items={units} title="Units"></Dropdown>
            <Dropdown items={assemblies} title="Assemblies"></Dropdown>
            <Dropdown items={subassemblies} title="Subassemblies"></Dropdown>
            <Dropdown items={parts} title="Parts"></Dropdown>

            {/* <h3>{definitionQuery.data}</h3> */}
        </SearchContainer>
    )
}

export default Search
