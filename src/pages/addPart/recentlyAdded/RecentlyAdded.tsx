import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { Item } from '../../../services/apiTypes.ts'

import { useNavigate } from 'react-router'

import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'
import { useGetItemsByUser } from '../../../services/hooks/useGetItemByUser.tsx'

import { Button } from '../../../components/Button/SubmitButton.tsx'
import { RecentlyAddedContainer } from './styles.ts'
import { COLORS } from '../../../style/GlobalStyles.ts'
import SearchResultCardSkeleton from '../../../components/searchResultCard/SearchResultCardSkeleton.tsx'

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
