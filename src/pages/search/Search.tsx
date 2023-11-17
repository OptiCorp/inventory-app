import { useEffect, useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { SearchContainer } from "./styles"
import { Part, Assembly } from "../../services/apiTypes"
import { Link } from "react-router-dom"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"
import { useMutation, useQuery } from "@tanstack/react-query"
import apiService, { ApiService } from "../../services/api"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    // const [partList, setPartList] = useState<Part[]>([])
    const [assemblies, setAssemblies] = useState<Assembly[]>([])
    const [definition, setDefinition] = useState<string>("")
    const { width } = useWindowDimensions()
    const api = apiService();

    const { data: data, isLoading } = useQuery({
        queryFn: () => api.getAssembliesBySearchString(encodeURIComponent(searchTerm)),
        queryKey: ["assemblies"]
    });

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
        if (searchTerm.length >= 3) {
            (async () => {
                const response = await api.getAssembliesBySearchString(encodeURIComponent(searchTerm));
                setAssemblies(response);
                console.log(response[1]);
            })()
        }
    }, [searchTerm])

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    return (
        <SearchContainer>
            <SearchBar setSearchTerm={setSearchTerm} />
            {assemblies?.map((part) => (
                <Link style={{ textDecoration: 'none', color: 'black', }} to={`/${part.WPId}`}>{width > 800 ? <SearchResultCard part={part} key={part.WPId} /> : <SearchResultCardCompact part={part} key={part.WPId} />}</Link>
            ))}
            {/* <h3>{definitionQuery.data}</h3> */}
        </SearchContainer>
    )
}

export default Search
