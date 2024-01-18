import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';
import { Searchinfo } from './SearchInfo/SearchInfo';
import { StyledResultCardContainer, StyledSearchCard } from './styles';

type Props = {
    part: Item;
    icon?: string;
};

const SearchResultCard = ({ part, icon }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <StyledResultCardContainer
                style={{
                    cursor: `${location.pathname.includes(`/makelist`) ? null : `pointer`}`,
                }}
                onClick={() => {
                    location.pathname.includes('/makelist') ? null : navigate(`/${part.id}`);
                }}
            >
                <StyledSearchCard title="">
                    <Searchinfo part={part} icon={icon} />
                </StyledSearchCard>
            </StyledResultCardContainer>
        </>
    );
};

export default SearchResultCard;
