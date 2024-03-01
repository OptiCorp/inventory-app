import { useLocation, useNavigate } from 'react-router-dom';
import { ItemTemplate, Location, Vendor } from '../../services/apiTypes';
import { SearchInfo } from './SearchInfo/SearchInfo';
import { StyledSearchCard } from './styles';

export type ItemCardProps = {
    item: {
        id: string;
        wpId: string;
        serialNumber: string;
        location?: Location;
        vendor?: Vendor;
        createdDate: string;
        updatedDate?: string | null;
        itemTemplate: ItemTemplate;
    };
    icon?: string;
};

export const ItemCard = ({ item, icon }: ItemCardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname.includes('make-list')) return;
        navigate(`/item/${item.id}`);
    };

    const cursorStyle =
        location.pathname.includes('/search') || location.pathname.includes('/add-item')
            ? 'pointer'
            : undefined;

    return (
        <StyledSearchCard title="" onClick={handleClick} style={{ cursor: cursorStyle }}>
            <SearchInfo item={item} icon={icon} />
        </StyledSearchCard>
    );
};
