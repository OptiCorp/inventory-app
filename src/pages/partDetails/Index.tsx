import { useParams } from 'react-router-dom'
import {
    CompactLists,
    ListItem,
    Lists,
    StyledContainerDiv,
    StyledInfoDiv,
    StyledList,
    Title,
} from './styles'
import { Item } from '../../services/apiTypes'
import { useGetItems } from '../../services/hooks/useGetItems'
import { PartInfo } from './PartInfo'
import { useWindowDimensions } from '../../hooks'

type Props = {
    part: Item
}

const PartDetails = () => {
    const { id } = useParams()
    const { width } = useWindowDimensions()
    return (
        <>
            <StyledContainerDiv>
                <StyledInfoDiv>
                    <Title>Part info</Title>
                    {width > 800 ? (
                        <Lists>
                            <PartInfo />{' '}
                        </Lists>
                    ) : (
                        <CompactLists>
                            {' '}
                            <PartInfo />{' '}
                        </CompactLists>
                    )}
                </StyledInfoDiv>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
