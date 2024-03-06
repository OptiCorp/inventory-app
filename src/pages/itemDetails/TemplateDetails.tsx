import { FormProvider } from 'react-hook-form';
import { TemplateInfo } from './TemplateInfo';
import { useUpdateItemForm } from './itemInfo/hooks';
import { useParams } from 'react-router-dom';
import { useGetItemById } from '../../services/hooks/items/useGetItemById';
import { StyledContainerDiv } from './styles';

export const TemplateDetails = () => {
    const { itemId } = useParams();
    const { data: item } = useGetItemById(itemId!);
    const { methods } = useUpdateItemForm(item!);

    return (
        <StyledContainerDiv>
            <FormProvider {...methods}>
                <TemplateInfo />
            </FormProvider>
        </StyledContainerDiv>
    );
};
