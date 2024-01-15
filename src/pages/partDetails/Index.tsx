import { Breadcrumbs } from '@mui/material'
import { FormProvider } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { ExampleUpload } from '../../components/Upload/Upload'
import UploadMobile from '../../components/Upload/UploadMobile/UploadMobile'
import { useWindowDimensions } from '../../hooks'
import { useGetItemById } from '../../services/hooks/itemsFix/useGetItemById'
import { Log } from './Log'
import { Comments } from './comments/Comments'
import { Hierarchy } from './hierarchy'
import PartInfo from './partInfo/PartInfo'
import { useUpdatePartForm } from './partInfo/hooks/useUpdatePartForm'
import { BreadcrumbLink, BreadcrumbsMargin, StyledContainerDiv } from './styles'

const PartDetails = () => {
    const { id } = useParams() as { id: string }
    const { data: item, isLoading } = useGetItemById(id)
    const { methods } = useUpdatePartForm(item!)
    const navigate = useNavigate()
    const { width } = useWindowDimensions()
    if (!item) return null
    console.log(item)
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
                        <BreadcrumbLink
                            onClick={() => navigate(`/${item.id}`)}
                            underline="none"
                        >
                            {item.id}
                        </BreadcrumbLink>
                    </Breadcrumbs>
                </BreadcrumbsMargin>
            )}
            <FormProvider {...methods}>
                <PartInfo item={item} isLoading={isLoading} />
                <Hierarchy item={item} />
                {width > 500 ? (
                    <ExampleUpload item={item} />
                ) : (
                    <UploadMobile item={item} />
                )}

                <Comments item={item} />
                <Log item={item} />
            </FormProvider>
        </StyledContainerDiv>
    )
}

export default PartDetails
