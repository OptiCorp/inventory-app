import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
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
const settings = ['Profile', 'Account', 'Admin', 'Logout'];

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
    return (
        <>
            <AppBar color="transparent" position="static" elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Button component={NavLink} to="/">
                            <img
                                alt="logo"
                                src={'/WP 1.svg'}
                                width="48"
                                style={{ cursor: 'pointer' }}
                            />
                        </Button>
                        {width > 900 ? (
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
                        ) : (
                            <>
                                <Box sx={{ flexGrow: 1 }}>
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
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Admin" />
                                </IconButton>
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
                                    <MenuItem
                                        key={setting}
                                        onClick={() => {
                                            if (setting === 'Logout') {
                                                handleSignOut();
                                            } else if (setting === 'Admin') {
                                                navigate('/admin');
                                            }
                                        }}
                                    >
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet />
        </>
    );
}
export default ResponsiveAppBar;
