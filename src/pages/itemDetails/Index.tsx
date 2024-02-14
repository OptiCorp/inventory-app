import { Breadcrumbs, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomDialog } from '../../components/CustomDialog/CustomDialog';
import { Comments } from '../../components/ItemDetails/CommentForm/CommentForm';
import { ExampleUpload } from '../../components/Upload/Upload';
import UploadMobile from '../../components/Upload/UploadMobile/UploadMobile';
import AppContext from '../../contexts/AppContext';
import { useWindowDimensions } from '../../hooks';
import { useDeleteItemById } from '../../services/hooks/items/useDeleteItemById';
import { useGetItemById } from '../../services/hooks/items/useGetItemById';
import { ButtonContainer } from '../addItem/styles';
import { Log } from './Log';
import { Hierarchy } from './hierarchy';
import ItemInfo from './itemInfo/ItemInfo';
import { useUpdateItemForm } from './itemInfo/hooks/useUpdateItemForm';
import { BreadcrumbLink, BreadcrumbsMargin, StyledContainerDiv } from './styles';

const ItemDetails = () => {
    const { id } = useParams() as { id: string };
    const { data: item, isLoading } = useGetItemById(id);
    const { methods } = useUpdateItemForm(item!);
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const { data: parentItem } = useGetItemById(item?.parentId ?? '');
    const { mutate: deleteItem } = useDeleteItemById(item?.id ?? '');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { setSnackbarText, setSnackbarSeverity } = useContext(AppContext);
    if (!item) return null;

    const handleClose = () => {
        setIsOpen(false);
    };
    const handleDelete = () => {
        setIsOpen(false);

        deleteItem(item.id, {
            onSuccess: (removeData) => {
                setSnackbarText(`${item.wpId} was deleted`);

                if (removeData.status >= 400) {
                    setSnackbarSeverity('error');
                    setSnackbarText(`${removeData.statusText}, please try again.`);
                }
                navigate('/');
            },
        });
    };

    return (
        <StyledContainerDiv>
            {item.parentId && (
                <BreadcrumbsMargin>
                    <Breadcrumbs>
                        <BreadcrumbLink
                            onClick={() => navigate(`/item/${item.parentId}`)}
                            underline="none"
                        >
                            {parentItem?.itemTemplate?.type}: {item.parent?.wpId}
                        </BreadcrumbLink>
                        <BreadcrumbLink
                            onClick={() => navigate(`/item/${item.id}`)}
                            underline="none"
                        >
                            {item.itemTemplate.type}: {item.wpId}
                        </BreadcrumbLink>
                    </Breadcrumbs>
                </BreadcrumbsMargin>
            )}
            <FormProvider {...methods}>
                <ItemInfo item={item} isLoading={isLoading} />
                <Hierarchy item={item} />
                {width > 500 ? (
                    <ExampleUpload itemId={item.id} />
                ) : (
                    <UploadMobile itemId={item.id} />
                )}

                <Comments item={item} />
                <Log item={item} />
            </FormProvider>
            <ButtonContainer>
                <Button
                    variant="outlined"
                    color="error"
                    sx={{ borderRadius: '0', height: '40px', width: '200px' }}
                    onClick={() => setIsOpen(true)}
                >
                    Delete item
                </Button>
            </ButtonContainer>
            <CustomDialog
                open={isOpen}
                SubmitButtonOnClick={handleDelete}
                CancelButtonOnClick={handleClose}
                isWarning
                title="Delete item"
            >
                Are you sure you want to permanently delete &apos;{item.wpId}&apos;?
            </CustomDialog>
        </StyledContainerDiv>
    );
};

export default ItemDetails;
