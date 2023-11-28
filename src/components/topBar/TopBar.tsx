import { NavLink, Outlet } from 'react-router-dom'
import { TopBarContainer, StyledLinkDiv, HeaderWrap } from './styles'
import { StyledNavLink } from './styles'
import { useWindowDimensions } from '../../hooks'

const TopBar = () => {
    const { width } = useWindowDimensions()
    return (
        <div>
            <TopBarContainer>
                <HeaderWrap>
                    <StyledNavLink to="search">
                        <StyledLinkDiv>
                            <h3>Find parts</h3>
                        </StyledLinkDiv>
                    </StyledNavLink>
                    <StyledNavLink to="add-part">
                        <StyledLinkDiv>
                            <h3>Add part</h3>
                        </StyledLinkDiv>
                    </StyledNavLink>
                    <StyledNavLink to="makelist">
                        <StyledLinkDiv>
                            <h3>Make list</h3>
                        </StyledLinkDiv>
                    </StyledNavLink>
                </HeaderWrap>
                {width > 450 ? (<img
                    style={{ paddingRight: '16px' }}
                    src={'../../../public/WP 1.svg'}
                />) : null}

            </TopBarContainer>
            <Outlet />
        </div>
    )
}

export default TopBar
