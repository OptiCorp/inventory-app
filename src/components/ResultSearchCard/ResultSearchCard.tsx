import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';
import { Searchinfo } from './SearchInfo/SearchInfo';
import { ResultCardContainer, SearchCard } from './styles';

type Props = {
    part: Item;
    icon?: string;
};

const SearchResultCard = ({ part, icon }: Props) => {
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
        <ResultCardContainer style={{ cursor: cursorStyle }} onClick={handleClick}>
            <SearchCard title="">
                <Searchinfo part={part} icon={icon} />
            </SearchCard>
        </ResultCardContainer>
    );
};

export default SearchResultCard;
