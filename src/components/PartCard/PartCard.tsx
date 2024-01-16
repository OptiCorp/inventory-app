import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';
import { SearchInfo } from './SearchInfo/SearchInfo';
import { PartCardContainer, SearchCard } from './styles';

type Props = {
    part: Item;
    icon?: string;
    searchParam?: string;
};

const PartCard = ({ part, icon }: Props) => {
    const navigate = useNavigate();

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
