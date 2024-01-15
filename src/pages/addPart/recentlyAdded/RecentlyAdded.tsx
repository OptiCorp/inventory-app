import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button/Button.tsx'
import SearchResultCard from '../../../components/ResultSearchCard/ResultSearchCard.tsx'
import SearchResultCardCompact from '../../../components/ResultSearchCard/SearchInfoCompact.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { Item } from '../../../services/apiTypes.ts'
import { useGetItemsByUser } from '../../../services/hooks/items/useGetItemByUser.tsx'
import { COLORS } from '../../../style/GlobalStyles.ts'
import { Container, RecentlyAddedContainer } from './styles.ts'

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
