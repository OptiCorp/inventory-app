import { BreadcrumbLink, BreadcrumbsMargin, StyledContainerDiv } from './styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetItemById } from '../../services/hooks/Items/useGetItemById'
import { Comments } from './Comments/Comments'
import { FormProvider } from 'react-hook-form'
import { Hierarchy } from './Hierarchy'
import { Log } from './Log'
import PartInfo from './PartInfo/PartInfo'
import { useUpdatePartForm } from './useUpdatePartForm'
import { ExampleUpload } from '../../components/Upload/Upload'
import { Breadcrumbs } from '@mui/material'

const PartDetails = () => {
    const { id } = useParams() as { id: string }
    const { data: item, isLoading } = useGetItemById(id)
    const { methods } = useUpdatePartForm(item!)
    const navigate = useNavigate()
    if (!item) return null

    return (
        <StyledContainerDiv>
            {item.parentId && (
                <BreadcrumbsMargin>
                    <Breadcrumbs>
                        <BreadcrumbLink
                            onClick={() => navigate(`/${item.parentId}`)}
                            underline="none"
                        >
                            {item.parent?.id}
                        </BreadcrumbLink>
                        <BreadcrumbLink onClick={() => navigate(`/${item.id}`)} underline="none">
                            {item.id}
                        </BreadcrumbLink>
                    </Breadcrumbs>
                </BreadcrumbsMargin>
            )}
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
