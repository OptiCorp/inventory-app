import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`

export const StyledLinkDiv = styled.div`
    padding: 16px;
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
