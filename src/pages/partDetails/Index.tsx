import { StyledContainerDiv } from './styles'

import { useParams } from 'react-router-dom'
import { Card } from '../../components/card/Card'
import { useWindowDimensions } from '../../hooks'
import { useGetItemById } from '../../services/hooks/Items/useGetItemById'
import { Comments } from './Comments/Comments'
import { Documents } from './Documents'

import { FormProvider } from 'react-hook-form'
import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import PartInfo from './PartInfo/PartInfo'
import { useUpdatePartForm } from './useUpdatePartForm'

const PartDetails = () => {
    const { width } = useWindowDimensions()

    const { id } = useParams() as { id: string }
    const { data: item, isLoading } = useGetItemById(id)
    const { methods } = useUpdatePartForm(item)
    if (!item) return null
    return (
        <>
            <StyledContainerDiv>
                <FormProvider {...methods}>
                    <Card title="Part info">
                        <PartInfo item={item} isLoading={isLoading} />
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
                        <Log />
                    </Card>
                </FormProvider>
            </StyledContainerDiv>
        </>
    )
}

export default PartDetails
