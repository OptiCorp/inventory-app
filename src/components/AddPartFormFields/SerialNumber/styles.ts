import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles.ts';

export const HelperText = styled.span`
    width: 100%;
    padding-bottom: 15px;
    margin-inline: 1rem;
    font-size: 0.9rem;
    font-style: italic;
    display: list-item;
`;

export const StyledInput = styled.input`
    &&& {
        background-color: ${COLORS.lightGray};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
        margin-bottom: 0;
    }
`;
