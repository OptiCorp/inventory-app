import { useNavigate } from 'react-router-dom'

import { ResultCardContainer, SearchCard } from './styles'
import { useWindowDimensions } from '../../hooks'
import { List } from '../../services/apiTypes'


type Props = {
    part: List
}

const ListCard = ({ part }: Props) => {
    const navigate = useNavigate()
    const { width } = useWindowDimensions()
    return (
        <>
    {' '}
    <ResultCardContainer>
      <h2>{part.title}</h2>
        <h4>Created: {part.createdDate}</h4>
        <h4>Updated: {part.updatedDate}</h4>
        </ResultCardContainer>
        </>
        )
}

export default ListCard