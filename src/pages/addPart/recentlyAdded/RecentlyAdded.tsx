
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import SearchResultCardCompact from '../../../components/searchResultCard/SearchInfoCompact.tsx'
import SearchResultCard from '../../../components/searchResultCard/SearchResultCard.tsx'
import { useWindowDimensions } from '../../../hooks/index.ts'
import { useGetItemsByUser } from '../../../services/hooks/useGetItemByUser.tsx'
import { Button } from '../../../components/SubmitButton.tsx'
import { RecentlyAddedContainer, RecentlyAddedWrapper } from './styles.ts'

const RecentlyAdded = () => {
    const { width } = useWindowDimensions()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('batch')
    }
    const { data: myItems = [] } = useGetItemsByUser()


    return (
        <RecentlyAddedContainer>
            <h3>Recently added by you</h3>
            {myItems?.map((item: Item) =>
                width > 800 ? (
                    <SearchResultCard part={item} />
                ) : (
                    <SearchResultCardCompact part={item} />
                )
            )}


            <Button onClick={handleClick}>Add new item</Button>
          
        </RecentlyAddedContainer>
    )
}

export default RecentlyAdded
