import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';

import { SearchInfo } from '../ItemCard/SearchInfo/SearchInfo';
import { StyledItemCardContainer, StyledSearchCard } from '../ItemCard/styles';

type Props = {
    item: Item;
    icon?: string;
};

const SearchResultCard = ({ item, icon }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <StyledItemCardContainer
                style={{
                    cursor: `${location.pathname.includes(`/makelist`) ? null : `pointer`}`,
                }}
                onClick={() => {
                    location.pathname.includes('/makelist') ? null : navigate(`/${item.id}`);
                }}
            >
                <StyledSearchCard title="">
                    <SearchInfo item={item} icon={icon} />
                </StyledSearchCard>
            </StyledItemCardContainer>
        </>
    );
};

export default SearchResultCard;
