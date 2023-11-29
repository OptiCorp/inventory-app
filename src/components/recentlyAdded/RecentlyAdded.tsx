import { useContext, useEffect, useState } from 'react'
import UmAppContext from '../../contexts/UmAppContext'
import { useWindowDimensions } from '../../hooks'

import apiService from '../../services/api'
import { Item } from '../../services/apiTypes'
import { RecentlyAddedContainer } from './styles'
import SearchResultCardCompact from '../searchResultCard/SearchInfoCompact'
import SearchResultCard from '../searchResultCard/SearchResultCard'

const RecentlyAdded = () => {
    const [myItems, setMyItems] = useState<Item[]>()
    const api = apiService()
    const { width } = useWindowDimensions()
    const { currentUser } = useContext(UmAppContext)

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

            <button>Add new item</button>
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
