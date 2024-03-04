import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';

import { SearchInfo } from '../ItemCard/SearchInfo/SearchInfo';
import { StyledSearchCard } from '../ItemCard/styles';

type Props = {
    item: Item;
    icon?: string;
};

export const SearchResultCard = ({ item, icon }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <StyledSearchCard
                title=""
                style={{
                    cursor: `${location.pathname.includes(`/makelist`) ? null : `pointer`}`,
                }}
                onClick={() => {
                    location.pathname.includes('/makelist') ? null : navigate(`/item/${item.id}`);
                }}
            >
                <SearchInfo item={item} icon={icon} />
            </StyledSearchCard>
        </>
    );
};
