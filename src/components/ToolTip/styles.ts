import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const ToolTipContent = styled.div`
    position: absolute;
    background-color: ${COLORS.gray};
    left: 20px;
    line-height: 20px;
    top: -10px;
    width: fit-content;

    color: ${COLORS.black};
    padding: 4px 8px;
    border-radius: 4px;
`;

export const Wrapper = styled.div`
    position: relative;
`;
