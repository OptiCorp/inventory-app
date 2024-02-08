import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useWindowDimensions } from '../../hooks';
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';
import useNavigationControl from './hooks/useNavigation';

const pages = ['Find items', 'Add item', 'Make list'];

const settings = [
    { text: 'Categories', location: 'admin/categories' },
    { text: 'Vendors', location: 'admin/vendors' },
    { text: 'Locations', location: 'admin/locations' },
];

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const theme = useTheme();
    const { handleSignOut } = useNavigationControl();
    const { width } = useWindowDimensions();
    const location = useLocation();
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

    const adminLink = (location: string) => {
        navigate(location);
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar color="transparent" position="static" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Button component={NavLink} to="/">
                            <img
                                alt="logo"
                                src={'/WP 1.svg'}
                                width="48"
                                style={{ cursor: 'pointer' }}
                            />
                        </Button>
                        {width > 900 ? (
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                        // TODO instead of overriding styles, create new mui button
                                        <Button
                                            component={NavLink}
                                            to={`/${page.toLowerCase().replace(' ', '-')}`}
                                            sx={{
                                                textTransform: 'capitalize',
                                                fontSize: '1.2rem',
                                                ':hover': { backgroundColor: 'transparent' },
                                                marginLeft: '48px',
                                                color: location.pathname.includes(
                                                    page.toLowerCase().replace(' ', '-')
                                                )
                                                    ? 'primary.main'
                                                    : theme.palette.grey[600],
                                            }}
                                            key={page}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </Box>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open admin settings">
                                        <Button
                                            onClick={handleOpenUserMenu}
                                            sx={{
                                                textTransform: 'capitalize',
                                                fontSize: '1.2rem',
                                                ':hover': { backgroundColor: 'transparent' },
                                                marginLeft: '48px',
                                                cursor: 'pointer',
                                                color: anchorElUser
                                                    ? 'primary.main'
                                                    : theme.palette.grey[600],
                                            }}
                                        >
                                            {' '}
                                            Admin
                                            <AdminPanelSettingsIcon fontSize="large" />
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <>
                                                <MenuItem
                                                    key={setting.location}
                                                    onClick={() => {
                                                        if (setting.text === 'Logout') {
                                                            handleSignOut();
                                                        } else {
                                                            adminLink(setting.location);
                                                        }
                                                    }}
                                                >
                                                    <Typography textAlign="center" marginTop="5px">
                                                        {setting.text}
                                                    </Typography>
                                                </MenuItem>
                                            </>
                                        ))}
                                        <Divider />
                                        <MenuItem
                                            onClick={() => {
                                                handleSignOut();
                                            }}
                                        >
                                            <Typography textAlign="center" margin="10px 10px 0">
                                                Log out
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1, alignSelf: 'right' }}>
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
                                </Box>
                            </>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
export default ResponsiveAppBar;
