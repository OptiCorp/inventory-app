import { useWindowDimensions } from '../../hooks'

import { Item } from '../../services/apiTypes'
import { useGetItemsByUser } from '../../services/hooks/useGetItemByUser'
import SearchResultCardCompact from '../searchResultCard/SearchInfoCompact'
import SearchResultCard from '../searchResultCard/SearchResultCard'
import { RecentlyAddedContainer } from './styles'

const RecentlyAdded = () => {
    const { width } = useWindowDimensions()
    const { data: myItems = [] } = useGetItemsByUser()

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
