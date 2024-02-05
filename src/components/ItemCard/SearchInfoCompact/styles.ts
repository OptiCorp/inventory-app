import { styled } from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledItemCardCompactContainer = styled.div`
    display: flex;
    background-color: ${COLORS.lightGray};
    margin: 16px;
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    flex-direction: column;
    max-width: 500px;
    position: relative;
`;

export const StyledCompactInfoP = styled.div`
    width: 100%;
`;

export const StyledDescriptionWrap = styled.div`
    padding-bottom: 5px;
`;

export const StyledKeyWords = styled.p`
    font-weight: 600;
    margin: 0px;
    width: 100%;
`;
