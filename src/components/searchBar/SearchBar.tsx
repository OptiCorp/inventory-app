import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Icon, SearchBarContainer, StyledInput } from './styles'
import { useWindowDimensions } from '../../hooks'

type Props = {
    setSearchTerm: Dispatch<SetStateAction<string>>
    searchTerm: string
}

const SearchBar = ({ setSearchTerm, searchTerm }: Props) => {
    const { width } = useWindowDimensions()

    const debounce = () => {
        let timer: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => { setSearchTerm(args[0].target.value) }, 500)
        }
    }

    return (
        <>
            <SearchBarContainer>
                <Icon>
                    <img src={'./search.png'} style={{ paddingLeft: '1rem' }} />
                </Icon>
                <StyledInput
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSearchTerm(e.target.value)
                    }
                    type="text"
                    value={searchTerm}
                    placeholder=" Search for ID, description, PO number or S/N"
                    width={width}
                />
            </SearchBarContainer>
        </>
    )
}

export default SearchBar
