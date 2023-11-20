import { useEffect, useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { SearchContainer } from "./styles"
import { Parts, Assembly, Subassembly, Item, Unit } from "../../services/apiTypes"
import { Link } from "react-router-dom"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"
import { useMutation, useQuery } from "@tanstack/react-query"
import apiService, { ApiService } from "../../services/api"
import Dropdown from "../../components/dropdown/Dropdown"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    // const [partList, setPartList] = useState<Parts>([[], [], [], []])
    const [assemblies, setAssemblies] = useState<Assembly[]>([])
    const [subassemblies, setSubassemblies] = useState<Subassembly[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [units, setUnits] = useState<Unit[]>([])
    const [definition, setDefinition] = useState<string>("")
    const { width } = useWindowDimensions()
    const api = apiService();
    const [showMore, setShowMore] = useState(10);
    const [isFetching, setIsFetching] = useState<Boolean>(false);


    // const { data: data, isLoading } = useQuery({
    //     queryFn: () => api.getPartsBySearchString(encodeURIComponent(searchTerm)),
    //     queryKey: ["parts", searchTerm],
    // });

    // if (data) {
    //     setUnits(data[0]);
    //     setAssemblies(data[1]);
    //     setSubassemblies(data[2]);
    //     setItems(data[3]);
    // }

    // const getParts = async (): Promise<Part[]> => {
    //     const response = await fetch("data.json")
    //     return await response.json()
    // }

    // const searchParts = async (search: string): Promise<Part[]> => {
    //     const parts = await getParts()
    //     const idMatches = parts.filter(part => part.WPID.toLowerCase().includes(search))
    //     const descMatches = parts.filter(part => part.Description.toLowerCase().includes(search))
    //     const pnMatches = parts.filter(part => part.PN.toLowerCase().includes(search))
    //     const snMatches = parts.filter(part => part.SN.toLowerCase().includes(search))
    //     const matches = idMatches.concat(descMatches, pnMatches, snMatches)
    //     return matches
    // }


    useEffect(() => {
        if (searchTerm.length <= 1) {
            setUnits([]);
            setAssemblies([]);
            setSubassemblies([]);
            setItems([]);
            return;
        }
        (async () => {
            setIsFetching(true);
            const response = await api.getPartsBySearchString(encodeURIComponent(searchTerm));
            setUnits(response[0]);
            setAssemblies(response[1]);
            setSubassemblies(response[2]);
            setItems(response[3]);
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
            <Dropdown items={items} title="Items"></Dropdown>

            {/* <h3>{definitionQuery.data}</h3> */}
        </SearchContainer>
    )
}

export default Search
