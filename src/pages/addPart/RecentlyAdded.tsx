import { useContext, useEffect, useState } from "react"
import apiService from "../../services/api"
import { Item } from "../../services/apiTypes"
import { useWindowDimensions } from "../../hooks"
import UmAppContext from "../../contexts/UmAppContext"
import {RecentlyAddedContainer, SubmitButton} from "./styles"
import SearchResultCard from "../../components/searchResultCard/SearchResultCard.tsx";
import SearchResultCardCompact from "../../components/searchResultCard/SearchResultCardCompact.tsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const RecentlyAdded = () => {
    const [myItems, setMyItems] = useState<Item[]>()
    const api = apiService()
    const { width } = useWindowDimensions()
    const { currentUser } = useContext(UmAppContext)
    const navigate = useNavigate()
    
    const handleClick = () => {
        navigate('batch')
    }


    useEffect(() => {
        if (currentUser) {
            (async () => {
                const response = await api.getItemsByUserId(currentUser.id)
                setMyItems(response)
            })()
        }
    }, [])

    return (
        <RecentlyAddedContainer>
            <h3>Recently added by you</h3>
            {myItems?.map((item: Item) => (
                width > 800 ? <SearchResultCard part={item} /> : <SearchResultCardCompact part={item} />
            ))}

            <div style={{display: "flex", justifyContent: "end"}}>
                <SubmitButton onClick={handleClick}>Next</SubmitButton>
            </div>
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
