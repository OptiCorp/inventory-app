import { useNavigate } from 'react-router-dom'

import {Item, MutateItemList} from '../../services/apiTypes'
import { Searchinfo } from './cardInfo/SearchInfo'
import { ResultCardContainer, SearchCard } from './styles'
import React from "react";

type Props = {
    part: Item
    icon?: string
    listId?: string
}

const SearchResultCard = ({ part, icon }: Props) => {
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
                    <Searchinfo part={part} icon={icon} />
                </SearchCard>
            </ResultCardContainer>
        </>
    )
}

export default SearchResultCard
