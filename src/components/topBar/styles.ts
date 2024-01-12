import { Box, ListItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
`

export const StyledLinkDiv = styled.h3`
    padding: 0 16px 0 17px;
    font-size: 1.3rem;
    cursor: pointer;
`

export const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: ${COLORS.gray};
    &:hover {
        color: ${COLORS.primary};
    }
    &.active {
        color: ${COLORS.primary};
    }
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
export const CompactHeaderWrap = styled.div`
    display: flex;
`

export const HeaderWrap = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-evenly;
`

export const BackButton = styled.div`
    position: relative;
    margin: 0;
    cursor: pointer;
`

type Props = {
    $isopen: boolean | string
}
export const MenuAdmin = styled.div<Props>`
    cursor: pointer;

    color: ${({ $isopen }) => (String($isopen) ? COLORS.primary : COLORS.gray)};
    &.active {
        color: ${COLORS.primary} !important;
    }
    &:hover {
        color: ${COLORS.primary};
    }
`
export const MenuAdminLink = styled.span`
    padding: 2px 4px;
`

export const LogOutWrapper = styled.div`
    color: ${COLORS.gray};
    &.active {
        color: ${COLORS.primary};
    }
    &:hover {
        color: ${COLORS.primary};
    }
    cursor: pointer;
`
