import { useLocation, useNavigate } from 'react-router-dom';
import { Location, Vendor } from '../../services/apiTypes';
import { SearchInfo } from './SearchInfo/SearchInfo';
import { PartCardContainer, SearchCard } from './styles';

export type PartCardProps = {
    part: {
        id: string;
        wpId: string;
        name: string;
        serialNumber: string;
        productNumber: string;
        description: string;
        location?: Location;
        vendor?: Vendor;
        createdDate: string;
        updatedDate?: string;
    };
    icon?: string;
};

const PartCard = ({ part, icon }: PartCardProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        if (location.pathname === '/search' || location.pathname === '/add-part') {
            navigate(`/${part.id}`);
        }
    };

    const cursorStyle =
        location.pathname === '/search' || location.pathname === '/add-part'
            ? 'pointer'
            : undefined;

    return (
        <PartCardContainer style={{ cursor: cursorStyle }} onClick={handleClick}>
            <SearchCard title="">
                <SearchInfo part={part} icon={icon} />
            </SearchCard>
        </PartCardContainer>
    );
};

export default PartCard;
