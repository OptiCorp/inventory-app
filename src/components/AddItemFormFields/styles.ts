import styled from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledInputWrap = styled.div`
    display: flex;
    align-items: center;
    margin: 4px 0;
    gap: 10px;
    white-space: nowrap;
`;

export const StyledErrorP = styled.span`
    color: red;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
`;

export const StyledIconContainer = styled.div`
    display: inline-flex;
    justify-content: baseline;
    gap: 10px;
    word-break: keep-all;
    white-space: nowrap;
`;

export const StyledDiv = styled.div`
    max-width: 500px;
    padding-right: 5px;
`;

export const EllipsisText = styled.span`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 80px;
`;

export const ScrollWrapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 480px;
    max-height: 50px;
    overflow-y: auto;
    border: 1px dotted ${COLORS.darkGray};
    padding: 10px;
`;
