import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { globalTheme } from '../../style/GlobalStyles';
import useNavigationControl from './hooks/useNavigation';

const pages = ['Find parts', 'Add part', 'Make list'];
const settings = ['Profile', 'Account', 'Admin', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const theme = useTheme();

    const { handleBack, handleSearchIconClick, adminLinks, handleSignOut } = useNavigationControl();
    const location = useLocation();

    return (
        <>
            <ThemeProvider theme={globalTheme}>
                <AppBar color="transparent" position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Button component={NavLink} to="/">
                                <img
                                    alt="logo"
                                    src={'/WP 1.svg'}
                                    // onClick={handleSearchIconClick}
                                    width="48"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Button>
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
                                        onClick={handleCloseNavMenu}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>

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
            </ThemeProvider>
            <Outlet />
        </>
    );
}
export default ResponsiveAppBar;
