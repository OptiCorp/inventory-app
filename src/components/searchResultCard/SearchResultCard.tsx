import { useNavigate } from 'react-router-dom'
import { Item } from '../../services/apiTypes'
import { Searchinfo } from './cardInfo/SearchInfo'
import { ResultCardContainer, SearchCard } from './styles'

type Props = {
    part: Item
    icon?: string
}

const SearchResultCard = ({ part, icon }: Props) => {
    const navigate = useNavigate()

    return (
        <>
            <ResultCardContainer>
                <SearchCard title="">
                    <Searchinfo part={part} icon={icon} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
