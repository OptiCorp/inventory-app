import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import ItemCard from '../../../components/ItemCard/ItemCard';
import SearchResultCardCompact from '../../../components/ItemCard/SearchInfoCompact/SearchInfoCompact';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { Item } from '../../../services/apiTypes';
import { useGetItemsByUser } from '../../../services/hooks/items/useGetItemByUser';
import { Container, CardContainer, RecentlyAddedContainer } from './styles';

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
            <CardContainer>
                {myItems?.map((item: Item) =>
                    width > 800 ? (
                        <ItemCard key={item.id} item={item} />
                    ) : (
                        <SearchResultCardCompact key={item.id} item={item} />
                    )
                )}
            </CardContainer>
        </RecentlyAddedContainer>
    );
};

export default RecentlyAdded;
