import { StyledContainerDiv } from './styles'

import { Card } from '../../components/card/Card'
import { useWindowDimensions } from '../../hooks'
import { Comments } from './Comments'
import { Documents } from './Documents'
import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import { PartInfo } from './PartInfo'
import { useGetItemById } from '../../services/hooks/useGetItemById'
import { useParams } from 'react-router-dom'

const PartDetails = () => {
    const { width } = useWindowDimensions()

    const { id } = useParams() as {id: string}
    const { data: item = [] } = useGetItemById(id)
    
    return (
        <>
            <StyledContainerDiv>
                <Card title="Part info">
                    <PartInfo item={item} />
                </Card>
                <Card title="Hierarchy">
                    <Hierarchy />
                </Card>
                <Card title="Documents">
                    <Documents />
                </Card>
                <Card title="Comment">
                    <Comments />
                </Card>

                <Card title="Log">
                    <Log />
                </Card>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
