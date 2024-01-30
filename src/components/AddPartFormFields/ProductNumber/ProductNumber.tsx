import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { ItemTemplate } from '../../../services/apiTypes.ts';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const ProductNumber = () => {
    const { register, setValue, watch } = useFormContext();

    const selectedTemplate = watch('templateData') as ItemTemplate | undefined;

    useEffect(() => {
        if (selectedTemplate) {
            if (selectedTemplate.productNumber) {
                setValue('productNumber', selectedTemplate.productNumber);
            }
        }
    }, [selectedTemplate?.productNumber]);

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
            {/* <StyledInput type="text" placeholder="E.g BV 113 EU" {...register('productNumber')} /> */}
            <TextField
                disabled={selectedTemplate?.productNumber ? true : false}
                id="filled-disabled"
                sx={{ width: '500px' }}
                label=""
                placeholder="E.g BV 113 EU"
                defaultValue={selectedTemplate?.productNumber}
                variant="filled"
                {...register('productNumber')}
            />
        </StyledDiv>
    );
};
