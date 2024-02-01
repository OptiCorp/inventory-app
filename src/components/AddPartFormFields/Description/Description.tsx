import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

import { TextField } from '@mui/material';
import { PartSchema } from '../../../pages/addPart/hooks/partValidator';
import { StyledDiv, StyledErrorP } from '../styles';
import { StyledInputWrap } from './styles';

export const Description = () => {
    const { watch, register } = useFormContext<PartSchema>();
    const selectedTemplate = watch('itemTemplateId');
    return (
        <StyledDiv>
            <StyledInputWrap>
                <label htmlFor="description">Description </label>{' '}
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
                sx={{ width: '500px', height: '100px' }}
                label="Description"
                placeholder="E.g. Hydraulic cylinders can be purchased in a range of ISO standard measurement bore"
                variant="filled"
                {...register('itemTemplate.description')}
            />
        </StyledDiv>
    );
};
