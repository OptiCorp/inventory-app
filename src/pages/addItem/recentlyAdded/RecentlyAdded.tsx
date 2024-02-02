import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button.tsx';
import ItemCard from '../../../components/ItemCard/ItemCard.tsx';
import SearchResultCardCompact from '../../../components/ItemCard/SearchInfoCompact.tsx';
import { useWindowDimensions } from '../../../hooks/index.ts';
import { Item } from '../../../services/apiTypes.ts';
import { useGetItemsByUser } from '../../../services/hooks/items/useGetItemByUser.tsx';
import { Container, RecentlyAddedContainer } from './styles.ts';

const RecentlyAdded = () => {
    const { width } = useWindowDimensions();

    const { data: myItems = [] } = useGetItemsByUser();

    const navigate = useNavigate();

    return (
        <RecentlyAddedContainer>
            <Container>
                <h3>Recently added by you</h3>
                <Button onClick={() => navigate('batch')} variant="black">
                    Add new item
                </Button>
            </Container>
            {myItems?.map((item: Item) =>
                width > 800 ? (
                    <ItemCard key={item.id} item={item} />
                ) : (
                    <SearchResultCardCompact key={item.id} item={item} />
                )
            )}
        </RecentlyAddedContainer>
    );
};

export default RecentlyAdded;
