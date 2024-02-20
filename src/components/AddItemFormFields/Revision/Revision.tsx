import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';

export const Revision = () => {
    const { register } = useFormContext<ItemSchema>();

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="revision">Revision</label>
                    <ToolTip content="Specify a revision code">
                        <HelpOutlineIcon fontSize="small" />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="itemTemplate.revision"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>

            <TextField
                id="filled"
                sx={{ width: '100%' }}
                label=""
                placeholder="E.g 1.06"
                variant="filled"
                {...register('itemTemplate.revision')}
            />
        </StyledDiv>
    );
};
