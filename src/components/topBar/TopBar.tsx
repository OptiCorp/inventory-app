import { NavLink, Outlet } from "react-router-dom"
import { TopBarContainer, StyledLinkDiv } from "./styles"
import { StyledNavLink } from "./styles"

const TopBar = () => {
    return (
        <div>
            <TopBarContainer>
                <StyledNavLink to='search'><StyledLinkDiv><h3>Find parts</h3></StyledLinkDiv></StyledNavLink>
                <StyledNavLink to='addpart'><StyledLinkDiv><h3>Add part</h3></StyledLinkDiv></StyledNavLink>
                <StyledNavLink to='makelist'><StyledLinkDiv><h3>Make list</h3></StyledLinkDiv></StyledNavLink>
            </TopBarContainer>
            <Outlet />
        </div>
    )
}

export default TopBar
