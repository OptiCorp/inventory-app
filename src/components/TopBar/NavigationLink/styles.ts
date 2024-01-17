import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledLinkDiv = styled.h3`
    padding: 0 16px 0 17px;
    font-size: 1.3rem;
    cursor: pointer;
`;

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${COLORS.gray};
    &:hover {
        color: ${COLORS.black};
    }
    &.active {
        color: ${COLORS.black};
    }
`;
