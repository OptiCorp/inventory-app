import { useNavigate } from 'react-router-dom'

import { Item } from '../../services/apiTypes'
import { Searchinfo } from './cardInfo/SearchInfo'
import { ResultCardContainer, SearchCard } from './styles'

type Props = {
    part: Item
}

const SearchResultCard = ({ part }: Props) => {
    const navigate = useNavigate()

    return (
        <>
            <ResultCardContainer>
                <SearchCard
                    title=""
                    onClick={() => {
                        navigate(`/${part.id}/${part.wpId}`)
                    }}
                >
                    <Searchinfo part={part} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
