import { useNavigate } from 'react-router-dom';
import { ItemCard } from '../../../components/ItemCard/ItemCard';
import { SearchResultCardCompact } from '../../../components/ItemCard/SearchInfoCompact/SearchInfoCompact';
import { useWindowDimensions } from '../../../hooks/useWindowDimensions';
import { Item } from '../../../services/apiTypes';
import { useGetItemsByUser } from '../../../services/hooks/items/useGetItemByUser';
import { Container, CardContainer, RecentlyAddedContainer } from './styles';
import { Button } from '@mui/material';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';

export const RecentlyAdded = () => {
    const { width } = useWindowDimensions();

    const { data: myItems = [], isLoading } = useGetItemsByUser();

    const navigate = useNavigate();

    return (
        <RecentlyAddedContainer>
            <Container>
                <h3>Recently added by you</h3>
                <Button onClick={() => navigate('batch')} variant="contained">
                    Add new item
                </Button>
            </Container>
            <CardContainer>
                {isLoading && <GlobalSpinner />}
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
