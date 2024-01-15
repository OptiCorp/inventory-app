import { useNavigate } from 'react-router-dom'
import { Item } from '../../services/apiTypes'
import { ResultCardContainer, SearchCard } from './styles'
import { Searchinfo } from './SearchInfo/SearchInfo'

type Props = {
    part: Item
    icon?: string
}

const SearchResultCard = ({ part, icon }: Props) => {
    const navigate = useNavigate()

    return (
        <>
            <ResultCardContainer
                style={{
                    cursor: `${
                        location.pathname === `/search` || '/add-part'
                            ? `pointer`
                            : null
                    }`,
                }}
                onClick={() => {
                    location.pathname === '/search' || '/add-part'
                        ? navigate(`/${part.id}`)
                        : null
                }}
            >
                <SearchCard title="">
                    <Searchinfo part={part} icon={icon} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
