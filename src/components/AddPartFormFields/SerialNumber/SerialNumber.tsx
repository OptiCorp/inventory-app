import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';
import { StyledInput } from './styles.ts';

export const SerialNumber = () => {
    const { register } = useFormContext();
    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="Serial number">Serial number </label>{' '}
                    <ToolTip content="If left empty, a unique WP S/N will be generated">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="serialNumber"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />{' '}
            </StyledInputWrap>
            <StyledInput
                type="text"
                placeholder="E.g 1-12-2023.1.2"
                {...register('serialNumber')}
            />
        </StyledDiv>
    );
};
