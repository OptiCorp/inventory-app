import { styled } from 'styled-components';
import { COLORS } from '../../style/GlobalStyles';

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
`;

export const CompactHeaderWrap = styled.div`
    display: flex;
`;

export const HeaderWrap = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
`;

export const BackButton = styled.div`
    position: relative;
    margin: 0;
    cursor: pointer;
`;

type Props = {
    $isopen: boolean | string;
};
export const MenuAdmin = styled.div<Props>`
    cursor: pointer;

    color: ${({ $isopen }) => (String($isopen) ? COLORS.primary : COLORS.gray)};
    &.active {
        color: ${COLORS.primary} !important;
    }
    &:hover {
        color: ${COLORS.primary};
    }
`;
export const MenuAdminLink = styled.span`
    padding: 2px 4px;
`;

export const LogOutWrapper = styled.div`
    color: ${COLORS.gray};
    &.active {
        color: ${COLORS.primary};
    }
    &:hover {
        color: ${COLORS.primary};
    }
    cursor: pointer;
`;
