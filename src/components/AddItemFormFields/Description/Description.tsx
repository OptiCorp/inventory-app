import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { StyledDiv, StyledErrorP } from '../styles';
import { StyledInputWrap } from './styles';

export const Description = () => {
    const { watch, register } = useFormContext<ItemSchema>();
    const selectedTemplate = watch('itemTemplate.id');
    return (
        <StyledDiv>
            <StyledInputWrap>
                <label htmlFor="description">Description </label>
                <ErrorMessage
                    name="description"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>

            <TextField
                disabled={!!selectedTemplate}
                multiline
                rows={4}
                id="filled-disabled"
                sx={{ width: '100%' }}
                label="Description"
                placeholder="E.g. Hydraulic cylinders can be purchased in a range of ISO standard measurement bore"
                variant="filled"
                {...register('itemTemplate.description')}
            />
        </StyledDiv>
    );
};
