import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useWindowDimensions } from '../../hooks';
import { StyledIcon, StyledInput, StyledSearchBarContainer } from './styles';

type Props = {
    setSearchTerm: Dispatch<SetStateAction<string>>;
    searchTerm: string;
    placeholder: string;
};

const SearchBar = ({ setSearchTerm, searchTerm, placeholder }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            <StyledSearchBarContainer>
                <StyledIcon>
                    <img src={'/search.png'} style={{ paddingLeft: '1rem' }} />
                </StyledIcon>
                <StyledInput
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    type="text"
                    value={searchTerm}
                    placeholder={placeholder}
                    width={width}
                />
            </StyledSearchBarContainer>
        </>
    );
};

export default SearchBar;
