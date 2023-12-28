import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { Item } from '../../../services/apiTypes.ts'
import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'
import { useGetItemsByUser } from '../../../services/hooks/Items/useGetItemByUser.tsx'
import { Container, RecentlyAddedContainer } from './styles.ts'
import { Button } from '../../../components/Button/SubmitButton.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { useNavigate } from 'react-router-dom'

const RecentlyAdded = () => {
    const { width } = useWindowDimensions()

    const { data: myItems = [] } = useGetItemsByUser()

    const navigate = useNavigate()

    return (
        <RecentlyAddedContainer>
            <Container>
                <h3>Recently added by you</h3>
                <Button
                    onClick={() => navigate('batch')}
                    children="Add new item"
                    backgroundColor={COLORS.primary}
                    color="white"
                />
            </Container>
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
