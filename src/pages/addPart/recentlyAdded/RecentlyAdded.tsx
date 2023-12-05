import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { Item } from '../../../services/apiTypes.ts'

import { useNavigate } from 'react-router'

import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'
import { useGetItemsByUser } from '../../../services/hooks/useGetItemByUser.tsx'

import { Button } from '../../../components/Button/SubmitButton.tsx'
import { RecentlyAddedContainer } from './styles.ts'

const RecentlyAdded = () => {
    const { width } = useWindowDimensions()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('batch')
    }

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

            <Button onClick={handleClick}>Add new item</Button>
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
