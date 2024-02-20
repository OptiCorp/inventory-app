import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Drawer, Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';

import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';
import useNavigationControl from './hooks/useNavigation';
import {
    CompactContainer,
    StyledBackButton,
    StyledHeaderWrapper,
    StyledLink,
    StyledLogOutWrapper,
    StyledMenuAdmin,
    StyledMenuAdminLink,
    StyledNavLink,
    TopBarContainer,
} from './styles';

export const TopBar = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const { width } = useWindowDimensions();
    const [returnButton, setReturnButton] = useState(false);
    const { handleBack, handleSearchIconClick, adminLinks, handleSignOut } = useNavigationControl();

    useEffect(() => {
        const excludedRoutes = [
            '/',
            '/search',
            '/add-item',
            '/make-list',
            '/admin/categories',
            '/admin/vendors',
            '/admin/locations',
        ];
        setReturnButton(!excludedRoutes.includes(location.pathname));
    }, [location.pathname]);

    return (
        <>
            <TopBarContainer>
                {returnButton ? (
                    <StyledBackButton onClick={handleBack}>
                        <ArrowBackIcon fontSize="large" onClick={handleBack} />
                    </StyledBackButton>
                ) : (
                    <img
                        alt="logo"
                        src={'/WP 1.svg'}
                        onClick={handleSearchIconClick}
                        width="40"
                        style={{ cursor: 'pointer' }}
                    />
                )}
                {width > 800 ? (
                    <StyledHeaderWrapper>
                        <StyledNavLink to="search">
                            <StyledLink>Find items</StyledLink>
                        </StyledNavLink>
                        <StyledNavLink to="add-item">
                            <StyledLink>Add item</StyledLink>
                        </StyledNavLink>
                        <StyledNavLink to="makelist">
                            <StyledLink>Make list</StyledLink>
                        </StyledNavLink>
                        <PopupState variant="popover" popupId="demo-popup-menu">
                            {(popupState) => (
                                <>
                                    <StyledMenuAdmin
                                        $isopen={popupState.isOpen.toString()}
                                        {...bindTrigger(popupState)}
                                    >
                                        <StyledLink>Admin</StyledLink>
                                    </StyledMenuAdmin>
                                    <Menu {...bindMenu(popupState)}>
                                        <MenuItem onClick={popupState.close}>
                                            <StyledMenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/categories');
                                                }}
                                            >
                                                Categories
                                            </StyledMenuAdminLink>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <StyledMenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/vendors');
                                                }}
                                            >
                                                Vendors
                                            </StyledMenuAdminLink>
                                        </MenuItem>
                                        <MenuItem onClick={popupState.close}>
                                            <StyledMenuAdminLink
                                                onClick={() => {
                                                    adminLinks('admin/locations');
                                                }}
                                            >
                                                Locations
                                            </StyledMenuAdminLink>
                                        </MenuItem>
                                    </Menu>
                                </>
                            )}
                        </PopupState>
                        <StyledLogOutWrapper
                            onClick={() => {
                                handleSignOut();
                            }}
                        >
                            <StyledLink>Log out</StyledLink>
                        </StyledLogOutWrapper>
                    </StyledHeaderWrapper>
                ) : (
                    <CompactContainer>
                        <Button
                            style={{
                                color: 'black',
                                padding: 0,
                                minWidth: 0,
                            }}
                            onClick={() => setHamburgerIsOpen(true)}
                        >
                            <MenuIcon sx={{ fontSize: 40 }} />
                        </Button>

                        <Drawer
                            anchor="right"
                            open={hamburgerIsOpen}
                            onClose={() => setHamburgerIsOpen(false)}
                        >
                            <HamburgerMenu setHamburgerIsOpen={setHamburgerIsOpen} />
                        </Drawer>
                    </CompactContainer>
                )}
            </TopBarContainer>
            <Outlet />
        </>
    );
};

export default TopBar;
