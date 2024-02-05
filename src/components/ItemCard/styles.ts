import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledItemCardContainer = styled.div`
    /* margin: 16px;
    padding: 4px; */
    width: 550px;
    margin-inline: auto;
`;

export const StyledSearchCard = styled.div`
    position: relative;
    background: ${COLORS.lightestGray};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
`;
