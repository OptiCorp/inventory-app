import { useContext, useEffect, useState } from 'react'
import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import UmAppContext from '../../../contexts/UmAppContext.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import apiService from '../../../services/api.ts'
import { Item } from '../../../services/apiTypes.ts'
import { RecentlyAddedContainer } from '../styles.ts'

import { useNavigate } from 'react-router'
import { Button } from '../../../components/SubmitButton.tsx'
import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'

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
            ;(async () => {
                const response = await api.getItemsByUserId(currentUser.id)
                setMyItems(response)
            })()
        }
    }, [])

    return (
        <RecentlyAddedContainer>
            <h3>Recently added by you</h3>
            {myItems?.map((item: Item) =>
                width > 800 ? (
                    <SearchResultCard part={item} />
                ) : (
                    <SearchResultCardCompact part={item} />
                )
            )}

            <Button onClick={handleClick}>Add new item</Button>
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
