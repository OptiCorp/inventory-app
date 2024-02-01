import { useLocation, useNavigate } from 'react-router-dom';
import { ItemTemplate, Location, Vendor } from '../../services/apiTypes';
import { SearchInfo } from './SearchInfo/SearchInfo';
import { StyledPartCardContainer, StyledSearchCard } from './styles';

export type PartCardProps = {
    part: {
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

const PartCard = ({ part, icon }: PartCardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname.includes('makelist')) return;
        navigate(`/${part.id}`);
    };

    const cursorStyle =
        location.pathname.includes('/search') || location.pathname.includes('/add-part')
            ? 'pointer'
            : undefined;

    return (
        <StyledPartCardContainer style={{ cursor: cursorStyle }} onClick={handleClick}>
            <StyledSearchCard title="">
                <SearchInfo part={part} icon={icon} />
            </StyledSearchCard>
        </StyledPartCardContainer>
    );
};

export default PartCard;
