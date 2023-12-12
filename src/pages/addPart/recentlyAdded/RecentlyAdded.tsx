import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { Item } from '../../../services/apiTypes.ts'

import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'
import { useGetItemsByUser } from '../../../services/hooks/Items/useGetItemByUser.tsx'

import SearchResultCardSkeleton from '../../../components/searchResultCard/SearchResultCardSkeleton.tsx'
import { RecentlyAddedContainer } from './styles.ts'

const RecentlyAdded = () => {
    const { width } = useWindowDimensions()

    const { data: myItems = [] } = useGetItemsByUser()

    return (
        <RecentlyAddedContainer>
            <h3>Recently added by you</h3>
            <SearchResultCardSkeleton />
            {myItems?.map((item: Item) =>
                width > 800 ? (
                    <SearchResultCard key={item.id} part={item} />
                ) : (
                    <SearchResultCardCompact key={item.id} part={item} />
                )
            )}
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
