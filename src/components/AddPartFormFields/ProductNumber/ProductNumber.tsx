import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';
import { StyledInput } from './styles.ts';

export const ProductNumber = () => {
    const { register } = useFormContext();
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
            <StyledInput type="text" placeholder="E.g BV 113 EU" {...register('productNumber')} />
        </StyledDiv>
    );
};
