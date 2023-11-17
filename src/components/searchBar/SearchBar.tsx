import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { StyledDiv, StyledInput } from "./styles"
import { useWindowDimensions } from "../../hooks"
import { time } from "console"

type Props = {
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ setSearchTerm }: Props) => {
    const { width } = useWindowDimensions()

    // const debounce = (func: Dispatch<SetStateAction<string>>, timeOut: number) => {
    //     let timer: NodeJS.Timeout;
    //     return (search: [value: SetStateAction<string>]) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => {func.apply(this, search);}, timeOut)
    //     }


    //     // let timer = setTimeout(() => console.log(value), 1000)
    // }

    return (
        <StyledDiv>
            <StyledInput
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                type="text"
                placeholder="Search for ID, description, PO number or S/N"
                width={width} />
        </StyledDiv>
    )
}

export default SearchBar
