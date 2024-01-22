import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledDialogSubmitButton = styled.button`
    width: 150px;
    background-color: ${COLORS.black};
    color: ${COLORS.white};
    height: 30px;
    cursor: pointer;
    &:hover {
    }
    border: none;
`;

export const StyledDialogCancelButton = styled.button`
    width: 150px;
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    height: 30px;
    cursor: pointer;
    &:hover {
    }
    border: 1px solid #000;
`;
