import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const StyledAdminSearchCardContainer = styled.div`
    background: ${COLORS.lightestGray};
    box-shadow: 2px 4px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    margin: 8px;
    padding: 8px;
    justify-content: space-between;
`;

export const StyledAdminActions = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledTitleContainer = styled.div`
    display: flex;
    align-items: center;
    height: 56px;
`;
