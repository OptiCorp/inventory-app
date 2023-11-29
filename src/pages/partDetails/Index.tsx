import { StyledContainerDiv } from './styles'

import { Card } from '../../components/card/Card'
import { useWindowDimensions } from '../../hooks'
import { Comments } from './Comments'
import { Documents } from './Documents'
import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import { PartInfo } from './PartInfo'

const PartDetails = () => {
    const { width } = useWindowDimensions()
    return (
        <>
            <StyledContainerDiv>
                <Card title="Part info">
                    {' '}
                    <PartInfo />
                </Card>
                <Card title="Hierarchy">
                    {' '}
                    <Hierarchy />
                </Card>
                <Card title="Documents">
                    {' '}
                    <Documents />
                </Card>
                <Card title="Comment">
                    {' '}
                    <Comments />
                </Card>

                <Card title="Log">
                    {' '}
                    <Log />
                </Card>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
