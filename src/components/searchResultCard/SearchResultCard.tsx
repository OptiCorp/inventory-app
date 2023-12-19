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
    console.log(part.id)
    return (
        <>
            <ResultCardContainer>
                <SearchCard
                    title=""
                    onClick={() => {
                        navigate(`/${part.id}`)
                    }}
                >
                    <Searchinfo part={part} icon={icon} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
