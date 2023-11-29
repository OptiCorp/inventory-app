import { useNavigate } from 'react-router-dom'
import { useWindowDimensions } from '../../../hooks'
import { Item } from '../../../services/apiTypes'
import { Searchinfo } from './searchInfo/SearchInfo'
import { ResultCardContainer, SearchCard } from './styles'

type Props = {
    part: Item
}

const SearchResultCard = ({ part }: Props) => {
    const navigate = useNavigate()
    const { width } = useWindowDimensions()
    return (
        <>
            {' '}
            <ResultCardContainer>
                <SearchCard
                    title=""
                    onClick={() => {
                        navigate(`/${part.wpId}`)
                    }}
                >
                    <Searchinfo part={part} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
