import { useNavigate } from 'react-router-dom'
import { Item } from '../../../../services/apiTypes'
import {
    CompactCard,
    CompactCardWrapper,
    CompactDesriptionParagraph,
    CompactInfoP,
    KeyWords,
    ResultCardCompactContainer,
} from '../styles'

type Props = {
    part: Item
}

const SearchResultCardCompact = ({ part }: Props) => {
    const navigate = useNavigate()
    return (
        <>
            <ResultCardCompactContainer
                onClick={() => {
                    navigate(`/${part.wpId}`)
                }}
            >
                <CompactCard>
                    <CompactCardWrapper>
                        <CompactInfoP>
                            <KeyWords>ID:</KeyWords> {part.wpId}
                        </CompactInfoP>{' '}
                    </CompactCardWrapper>
                    <CompactInfoP>
                        <KeyWords>Location</KeyWords> {part.location}
                    </CompactInfoP>{' '}
                </CompactCard>
                <CompactDesriptionParagraph>
                    {part.description}
                </CompactDesriptionParagraph>
            </ResultCardCompactContainer>
        </>
    )
}

export default SearchResultCardCompact
