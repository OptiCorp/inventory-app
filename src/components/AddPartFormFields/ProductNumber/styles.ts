import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles.ts';

export const StyledInput = styled.input`
    &&& {
        background-color: ${COLORS.lightGray};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
        margin-bottom: 0;
    }
`;
