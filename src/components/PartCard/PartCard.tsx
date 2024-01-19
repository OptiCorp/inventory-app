import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';
import { SearchInfo } from './SearchInfo/SearchInfo';
import { StyledPartCardContainer, StyledSearchCard } from './styles';

type Props = {
    part: Item;
    icon?: string;
};

const PartCard = ({ part, icon }: Props) => {
    const navigate = useNavigate();

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
