import { FormProvider } from 'react-hook-form';
import { TemplateInfo } from './TemplateInfo';
import { useUpdateItemForm } from './itemInfo/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetItemById } from '../../services/hooks/items/useGetItemById';
import { StyledContainerDiv } from './styles';
import { Button } from '@mui/material';
import { ButtonContainer } from '../addItem/styles';

export const TemplateDetails = () => {
    const navigate = useNavigate();
    const { itemId } = useParams();
    const { data: item } = useGetItemById(itemId!);
    const { methods } = useUpdateItemForm(item!);

    return (
        <StyledContainerDiv>
            <FormProvider {...methods}>
                <TemplateInfo />
            </FormProvider>
            <ButtonContainer>
                <Button onClick={() => navigate(-1)} variant="contained">
                    Back
                </Button>
            </ButtonContainer>
        </StyledContainerDiv>
    );
};
