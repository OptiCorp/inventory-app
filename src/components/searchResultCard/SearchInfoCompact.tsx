import { useNavigate } from 'react-router-dom'

import { Item } from '../../services/apiTypes'
import {
    CompactCard,
    CompactDesriptionParagraph,
    CompactInfoP,
    KeyWords,
    ResultCardCompactContainer,
} from './styles'

type Props = {
    part: Item
}

const SearchResultCardCompact = ({ part }: Props) => {
    const navigate = useNavigate()
    return (
        <>
            <ResultCardCompactContainer
                onClick={() => {
                    navigate(`/${part.id}/${part.wpId}`)
                }}
            >
                <CompactCard>
                    <CompactInfoP>
                        <KeyWords>ID:</KeyWords> {part.wpId}
                    </CompactInfoP>{' '}
                    <CompactInfoP>
                        <KeyWords>Location</KeyWords>{' '}
                        {part.location || 'Location'}
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
