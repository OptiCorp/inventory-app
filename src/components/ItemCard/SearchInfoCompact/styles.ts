import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledItemCardCompactContainer = styled.div`
    display: flex;
    /* background-color: ${COLORS.lightGray}; */
    background-color: orange;
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    flex-direction: column;
    max-width: 400px;
    position: relative;
`;

export const StyledCompactInfoP = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
`;

export const StyledCompactContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    background-color: yellow;
`;

export const StyledCompactDescriptionWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin: 8px 0px;
    background-color: lightgoldenrodyellow;
`;

export const StyledKeyWords = styled.p`
    font-weight: 600;
    margin: 0px;
    width: 100%;
    background-color: lightgreen;
`;

export const StyledCompactTitle = styled.p`
    margin: 0px;
    display: flex;
    font-weight: 600;
    background-color: lightgreen;
`;
export const StyledCompactText = styled.p`
    margin: 0px;
    display: flex;
    background-color: coral;
`;

export const StyledCompactBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
