import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;

`

export const StyledLinkDiv = styled.div`
    padding: 16px 16px 16px 0;
`

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: gray;
    &.active {
        color: black;
    }
`

export const HeaderWrap = styled.div`
    display: flex;
`
