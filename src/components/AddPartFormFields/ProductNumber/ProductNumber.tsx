import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';

import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';

import { PartSchema } from '../../../pages/addPart/hooks/partValidator.ts';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const ProductNumber = () => {
    const { watch, register } = useFormContext<PartSchema>();
    const selectedTemplate = watch('itemTemplate.id');
    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="productNumber">Product number</label>{' '}
                    <ToolTip content="Specify a product number">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="productNumber"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>

            <TextField
                disabled={!!selectedTemplate}
                id="filled-disabled"
                sx={{ width: '500px' }}
                label=""
                placeholder="E.g BV 113 EU"
                variant="filled"
                {...register('itemTemplate.productNumber')}
            />
        </StyledDiv>
    );
};
