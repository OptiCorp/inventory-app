import { useWindowDimensions } from '../../hooks'
import { Item } from '../../services/apiTypes'
import {
    CompactCard,
    CompactCardWrapper,
    CompactDesriptionParagraph,
    ResultCardCompactContainer,
} from './styles'

type Props = {
    part: Item
    searchTerm: string
}

const SearchResultCardCompact = ({ part }: Props) => {
    const { width } = useWindowDimensions()
    return (
        <ResultCardCompactContainer>
            <CompactCard>
                <CompactCardWrapper>
                    <p>
                        <b>ID:</b>
                    </p>
                    <p>{part.wpId}</p>
                </CompactCardWrapper>
                <div>
                    <p>
                        <b>Location</b>
                    </p>
                    <p>{part.location}</p>
                </div>
            </CompactCard>
            <CompactDesriptionParagraph>
                {part.description}
            </CompactDesriptionParagraph>
        </ResultCardCompactContainer>
    )
}

export default SearchResultCardCompact
