import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { StyledDiv, StyledInput } from "./styles"
import { useWindowDimensions } from "../../hooks"
type Props = {
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ setSearchTerm }: Props) => {
    const { width } = useWindowDimensions()

    const debounce = () => {
        let timer: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => { setSearchTerm(args[0].target.value) }, 500)
        }
    }


    return (
        <StyledDiv>
            <StyledInput
                onChange={debounce()}
                type="text"
                placeholder="Search for ID, description, PO number or S/N"
                width={width} />
        </StyledDiv>
    )
}

export default SearchBar
