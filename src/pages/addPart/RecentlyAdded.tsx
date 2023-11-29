import SearchResultCard from '../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../hooks'
import { Item } from '../../services/apiTypes'
import { RecentlyAddedContainer, SubmitButton } from './styles.ts'

import { useNavigate } from 'react-router'
import SearchResultCardCompact from '../../components/searchResultCard/SearchInfoCompact'
import { useGetItemsByUser } from '../../services/hooks/useGetItemByUser.tsx'

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

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    maxWidth: '1000px',
                    padding: '16px',
                }}
            >
                <SubmitButton onClick={handleClick}>Add new item</SubmitButton>
            </div>
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
