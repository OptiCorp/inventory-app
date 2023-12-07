import { StyledContainerDiv } from './styles'

import { useParams } from 'react-router-dom'
import { Card } from '../../components/card/Card'
import { useWindowDimensions } from '../../hooks'
import { useGetItemById } from '../../services/hooks/useGetItemById'
import { Comments } from './Comments/Comments'
import { Documents } from './Documents'

import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import PartInfo from './PartInfo/PartInfo'


const PartDetails = () => {
    const { width } = useWindowDimensions()

    const { id } = useParams() as { id: string }
    const { data: item = [] } = useGetItemById(id)

    return (
        <>
            <StyledContainerDiv>
                <Card title="Part info">
                    <PartInfo item={item} />
                </Card>
                <Card title="Hierarchy">
                    <Hierarchy item={item} />
                </Card>
                <Card title="Documents">
                    <Documents />
                </Card>
                <Card title="Comments">
                    <Comments item={item} />
                </Card>

                <Card title="Log">
                    <Log item={item} />
                </Card>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
