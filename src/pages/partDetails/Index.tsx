import { Breadcrumbs } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ExampleUpload } from '../../components/Upload/Upload';
import UploadMobile from '../../components/Upload/UploadMobile/UploadMobile';
import { useWindowDimensions } from '../../hooks';
import { useGetItemById } from '../../services/hooks/items/useGetItemById';
import { Log } from './Log';
import { Comments } from './comments/Comments';
import { Hierarchy } from './hierarchy';
import PartInfo from './partInfo/PartInfo';
import { useUpdatePartForm } from './partInfo/hooks/useUpdatePartForm';
import { BreadcrumbLink, BreadcrumbsMargin, StyledContainerDiv } from './styles';
import { Button } from '../../components/Button/Button';
import { ButtonContainer } from '../addPart/styles';
import { useDeleteItemById } from '../../services/hooks/items/useDeleteItemById';
import { useState } from 'react';
import CustomDialog from '../../components/CustomDialog/CustomDialog';

const PartDetails = () => {
    const { id } = useParams() as { id: string };
    const { data: item, isLoading } = useGetItemById(id);
    const { methods } = useUpdatePartForm(item!);
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { data: parentItem } = useGetItemById(item?.parentId ?? '');
    const { mutate: deleteItem } = useDeleteItemById(item?.id ?? '');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    if (!item) return null;

    const handleClose = () => {
        setIsOpen(false);
    };
    const handleDelete = () => {
        setIsOpen(false);
        deleteItem();
        navigate('/');
    };

    return (
        <StyledContainerDiv>
            {item.parentId && (
                <BreadcrumbsMargin>
                    <Breadcrumbs>
                        <BreadcrumbLink
                            onClick={() => navigate(`/${item.parentId}`)}
                            underline="none"
                        >
                            {parentItem?.itemTemplate?.type}: {item.parent?.wpId}
                        </BreadcrumbLink>
                        <BreadcrumbLink onClick={() => navigate(`/${item.id}`)} underline="none">
                            {item.itemTemplate.type}: {item.wpId}
                        </BreadcrumbLink>
                    </Breadcrumbs>
                </BreadcrumbsMargin>
            )}
            <FormProvider {...methods}>
                <PartInfo item={item} isLoading={isLoading} />
                <Hierarchy item={item} />
                {width > 500 ? <ExampleUpload item={item} /> : <UploadMobile item={item} />}

                <Comments item={item} />
                <Log item={item} />
            </FormProvider>
            <ButtonContainer>
                <Button variant="red" type="button" onClick={() => setIsOpen(true)}>
                    Delete
                </Button>
            </ButtonContainer>
            <CustomDialog
                open={isOpen}
                SubmitButtonOnClick={handleDelete}
                CancelButtonOnClick={handleClose}
                title="Delete item"
            >
                Are you sure you want to permanently delete &apos;{item.wpId}&apos;?
            </CustomDialog>
        </StyledContainerDiv>
    );
};

export default PartDetails;
