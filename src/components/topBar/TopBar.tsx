import { Outlet } from "react-router-dom"
import { TopBarContainer, StyledLinkDiv } from "./styles"
import { StyledNavLink } from "./styles"
import {useWindowDimensions} from "../../hooks";

const TopBar = () => {
    const { width } = useWindowDimensions()
    return (
        <div>
            <TopBarContainer>
                <div style={{ display: 'flex' }}>
                    <StyledNavLink to='search'><StyledLinkDiv><h3>Find parts</h3></StyledLinkDiv></StyledNavLink>
                    <StyledNavLink to='add-part'><StyledLinkDiv><h3>Add part</h3></StyledLinkDiv></StyledNavLink>
                    <StyledNavLink to='makelist'><StyledLinkDiv><h3>Make list</h3></StyledLinkDiv></StyledNavLink>
                </div>
                {width > 450 ? (<img alt='logo' style={{ paddingRight: '16px' }} src='/WP 1.svg' />) : null}
            </TopBarContainer>
            <Outlet />
        </div>
    )
}

export default TopBar
