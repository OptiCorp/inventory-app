import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useWindowDimensions } from '../../hooks';
import { Icon, SearchBarContainer, StyledInput } from './styles';

type Props = {
    setSearchTerm: Dispatch<SetStateAction<string>>;
    searchTerm: string;
    placeholder: string;
};

const SearchBar = ({ setSearchTerm, searchTerm, placeholder }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            <SearchBarContainer>
                <Icon>
                    <img src={'/search.png'} style={{ paddingLeft: '1rem' }} />
                </Icon>
                <StyledInput
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    type="text"
                    value={searchTerm}
                    placeholder={placeholder}
                    width={width}
                />
            </SearchBarContainer>
        </>
    );
};

export default SearchBar;
