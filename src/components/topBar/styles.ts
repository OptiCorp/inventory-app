import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: start;
    padding: 8px;
`;

export const StyledLinkDiv = styled.div`
    padding: 16px;
`;

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: gray;
    &.active {
        color: black;
    }
`;
