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
    min-height: 56px;
`;

export const StyledEllipsisContainer = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        width: 500px;
    }

    @media screen and (max-width: 700px) {
        width: 400px;
    }

    @media screen and (max-width: 570px) {
        width: 250px;
    }

    @media screen and (max-width: 400px) {
        width: 200px;
    }
`;

export const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
