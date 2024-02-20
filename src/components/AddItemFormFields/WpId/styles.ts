import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

interface StyledInputProps {
    $isUnique?: boolean;
}

export const StyledParagraph = styled.p<StyledInputProps>`
    color: ${(props) => (props.$isUnique === false ? COLORS.red : COLORS.green)};
    margin-top: 0px;
`;
