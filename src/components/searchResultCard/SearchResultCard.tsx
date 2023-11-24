import { useWindowDimensions } from "../../hooks"
import { StyledLink } from "../../pages/search/styles"
import { Item } from "../../services/apiTypes"
import { Searchinfo } from "./SearchInfo"
import { ResultCardContainer, DescriptionParagraph, Card } from "./styles"


type Props = {
    part: Item
}

const SearchResultCard = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return ( 
        <ResultCardContainer>
             
            <Card>
             <Searchinfo part={part}/>
            </Card>
        </ResultCardContainer>
    )
}

export default SearchResultCard
