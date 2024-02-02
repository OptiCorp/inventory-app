import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles.ts';

interface StyledInputProps {
    $isUnique?: boolean;
}

export const StyledInput = styled.input<StyledInputProps>`
    &&& {
        background-color: ${COLORS.lightGray};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
        border: ${(props) => (props.$isUnique === false ? `1px solid ${COLORS.red}` : null)};
    }
`;

export const StyledParagraph = styled.p<StyledInputProps>`
    color: ${(props) => (props.$isUnique === false ? COLORS.red : COLORS.green)};
    margin-top: 0px;
`;
