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

    return (
        <>
            <ResultCardContainer
                style={{
                    cursor: `${location.pathname.includes(`/makelist`) ? null : `pointer`}`,
                }}
                onClick={() => {
                    location.pathname.includes('/makelist') ? null : navigate(`/${part.id}`);
                }}
            >
                <SearchCard title="">
                    <Searchinfo part={part} icon={icon} />
                </SearchCard>
            </ResultCardContainer>
        </>
    );
};

export default SearchResultCard;
