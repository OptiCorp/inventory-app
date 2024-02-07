import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';

import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';

export const ProductNumber = () => {
    const { watch, register } = useFormContext<ItemSchema>();
    const selectedTemplate = watch('itemTemplate.id');

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="productNumber">Product number</label>
                    <ToolTip content="Specify a product number">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="itemTemplate.productNumber"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>

            <TextField
                disabled={!!selectedTemplate}
                id="filled-disabled"
                sx={{ width: '100%' }}
                label=""
                placeholder="E.g BV 113 EU"
                variant="filled"
                {...register('itemTemplate.productNumber')}
            />
        </StyledDiv>
    );
};
