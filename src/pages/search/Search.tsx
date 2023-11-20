import { useEffect, useState } from "react"
import SearchBar from "../../components/searchBar/SearchBar"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard"
import { SearchContainer } from "./styles"
import { Part } from "../../services/apiTypes"
import { Link } from "react-router-dom"
import { useWindowDimensions } from "../../hooks"
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact"


const Search = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [partList, setPartList] = useState<Part[]>([])
    const [definition, setDefinition] = useState<string>("")
    const { width } = useWindowDimensions()

    const getParts = async (): Promise<Part[]> => {
        const response = await fetch("data.json")
        return await response.json()
    }

    const searchParts = async (search: string): Promise<Part[]> => {
        const parts = await getParts()
        const idMatches = parts.filter(part => part.WPID.toLowerCase().includes(search))
        const descMatches = parts.filter(part => part.Description.toLowerCase().includes(search))
        const pnMatches = parts.filter(part => part.PN.toLowerCase().includes(search))
        const snMatches = parts.filter(part => part.SN.toLowerCase().includes(search))
        const matches = idMatches.concat(descMatches, pnMatches, snMatches)
        return matches
    }

    useEffect(() => {
        if (searchTerm.length >= 1) {
            (async () => {
                const parts = await searchParts(searchTerm.toLowerCase())
                setPartList(parts)
            })()
        } else {
            setPartList([])
        }
    }, [searchTerm])

    return (
        <SearchContainer>
            <SearchBar setSearchTerm={setSearchTerm} />
            {partList.map((part) => (
                <Link style={{ textDecoration: 'none', color: 'black', }} to={`/${part.WPID}`}>{width > 850 ? <SearchResultCard part={part} key={part.WPID} /> : <SearchResultCardCompact part={part} key={part.WPID} />}</Link>
            ))}
            {/* <h3>{definitionQuery.data}</h3> */}
        </SearchContainer>
    )
}

export default Search
