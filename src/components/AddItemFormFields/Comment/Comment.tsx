import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { StyledDiv, StyledInputWrap } from '../styles';

export const Comment = () => {
    const { register } = useFormContext();
    return (
        <StyledDiv>
            <StyledInputWrap>
                <label htmlFor="Comment">Comment</label>
            </StyledInputWrap>
            <TextField
                multiline
                rows={5}
                id="filled-disabled"
                sx={{ width: '100%' }}
                label="Comment"
                placeholder=""
                variant="filled"
                {...register('comment')}
            />
        </StyledDiv>
    );
};
