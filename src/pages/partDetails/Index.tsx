import { StyledContainerDiv } from './styles'
import { useParams } from 'react-router-dom'
import { useGetItemById } from '../../services/hooks/Items/useGetItemById'
import { Comments } from './Comments/Comments'
import { FormProvider } from 'react-hook-form'
import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import PartInfo from './PartInfo/PartInfo'
import { useUpdatePartForm } from './useUpdatePartForm'
import { ExampleUpload } from '../../components/Upload/Upload'
import { it } from 'node:test'

const PartDetails = () => {
    const { id } = useParams() as { id: string }
    const { data: item, isLoading } = useGetItemById(id)
    const { methods } = useUpdatePartForm(item!)
    if (!item) return null
    return (
        <StyledContainerDiv>
            <FormProvider {...methods}>
                <PartInfo item={item} isLoading={isLoading} />
                <Hierarchy item={item} />
                <ExampleUpload item={item} />
                <Comments item={item} />
                <Log item={item} />
            </FormProvider>
        </StyledContainerDiv>
    )
}

export default PartDetails
