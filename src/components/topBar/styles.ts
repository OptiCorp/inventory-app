import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;

`

export const StyledLinkDiv = styled.div`
    padding: 16px 16px 16px 0;
`

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${COLORS.gray};
    &.active {
        color: ${COLORS.primary};
    }
`

export const HeaderWrap = styled.div`
    display: flex;
`
