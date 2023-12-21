import { Box, ListItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px 0 16px 0;
`

export const StyledLinkDiv = styled.div`
    padding: 0 16px 0 0;
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

export const DropdownItem = styled(ListItem)`
    && {
        margin-left: 20px;
        padding: 0 16px;
    }
`

export const HamburgerContainer = styled(Box)`
    &&&& {
        width: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
`
