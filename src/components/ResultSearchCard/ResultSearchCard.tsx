import { useNavigate } from 'react-router-dom';
import { Item } from '../../services/apiTypes';

import { SearchInfo } from '../PartCard/SearchInfo/SearchInfo';
import { StyledPartCardContainer, StyledSearchCard } from '../PartCard/styles';

type Props = {
    part: Item;
    icon?: string;
};

const SearchResultCard = ({ part, icon }: Props) => {
    const navigate = useNavigate();

    return (
        <>
            <StyledPartCardContainer
                style={{
                    cursor: `${location.pathname.includes(`/makelist`) ? null : `pointer`}`,
                }}
                onClick={() => {
                    location.pathname.includes('/makelist') ? null : navigate(`/${part.id}`);
                }}
            >
                <StyledSearchCard title="">
                    <SearchInfo part={part} icon={icon} />
                </StyledSearchCard>
            </StyledPartCardContainer>
        </>
    );
};

export default SearchResultCard;
