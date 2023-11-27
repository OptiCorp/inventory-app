import { useWindowDimensions } from '../../hooks'
import { StyledLink } from '../../pages/search/styles'
import { Item } from '../../services/apiTypes'
import { Searchinfo } from './SearchInfo'
import { ResultCardContainer, DescriptionParagraph, Card } from './styles'

type Props = {
    part: Item
    searchTerm: string
}

const SearchResultCard = ({ part, searchTerm }: Props) => {
    return (
        <ResultCardContainer>
            <Card>
                <Searchinfo part={part} searchTerm={searchTerm} />
            </Card>
        </ResultCardContainer>
    )
}

export default SearchResultCard
