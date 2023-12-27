import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import BusinessIcon from '@mui/icons-material/Business'
import CategoryIcon from '@mui/icons-material/Category'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import PlaceIcon from '@mui/icons-material/Place'
import SearchIcon from '@mui/icons-material/Search'
import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    DropdownItem,
    HamburgerContainer,
    HeaderWrap,
    TopBarContainer,
} from './styles'
import { useMsal } from '@azure/msal-react'

const TopBar = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false)
    const [adminDropdownIsOpen, setAdminDropdownIsOpen] = useState(false)
    const navigate = useNavigate()

    const hamburgerLink = (location: string) => {
        navigate(location)
    }
    const { instance } = useMsal()
    const handleSignOut = () => {
        navigate('/')
        instance.logoutPopup()
    }

    return (
        <div>
            <TopBarContainer>
                <img
                    alt="logo"
                    src={'/WP 1.svg'}
                    onClick={() => navigate('search')}
                    width="40"
                    style={{ cursor: 'pointer' }}
                />
                <HeaderWrap>
                    <Button
                        style={{ color: 'black', padding: 0, minWidth: 0 }}
                        onClick={() => setHamburgerIsOpen(true)}
                    >
                        <MenuIcon sx={{ fontSize: 40 }} />
                    </Button>

                    <Drawer
                        anchor="right"
                        open={hamburgerIsOpen}
                        onClose={() => setHamburgerIsOpen(false)}
                    >
                        <HamburgerContainer>
                            <List>
                                <ListItem>
                                    <ListItemButton
                                        onClick={() => {
                                            hamburgerLink('search')
                                            setHamburgerIsOpen(false)
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SearchIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Find parts'} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton
                                        onClick={() => {
                                            hamburgerLink('add-part')
                                            setHamburgerIsOpen(false)
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AddIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Add parts'} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem>
                                    <ListItemButton
                                        onClick={() => {
                                            hamburgerLink('makelist')
                                            setHamburgerIsOpen(false)
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ListAltIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Make lists'} />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem
                                    style={{ padding: '8px 16px 0 16px' }}
                                >
                                    <ListItemButton
                                        onClick={() => {
                                            setAdminDropdownIsOpen(
                                                !adminDropdownIsOpen
                                            )
                                        }}
                                    >
                                        <ListItemIcon>
                                            <AdminPanelSettingsIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Admin'} />
                                    </ListItemButton>
                                </ListItem>

                                {adminDropdownIsOpen ? (
                                    <List style={{ padding: 0 }}>
                                        <DropdownItem>
                                            <ListItemButton
                                                onClick={() => {
                                                    hamburgerLink(
                                                        'admin/categories'
                                                    )
                                                    setHamburgerIsOpen(false)
                                                    setAdminDropdownIsOpen(
                                                        false
                                                    )
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <CategoryIcon fontSize="large" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Categories'}
                                                />
                                            </ListItemButton>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <ListItemButton
                                                onClick={() => {
                                                    hamburgerLink(
                                                        'admin/vendors'
                                                    )
                                                    setHamburgerIsOpen(false)
                                                    setAdminDropdownIsOpen(
                                                        false
                                                    )
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <BusinessIcon fontSize="large" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Vendors'}
                                                />
                                            </ListItemButton>
                                        </DropdownItem>

                                        <DropdownItem>
                                            <ListItemButton
                                                onClick={() => {
                                                    hamburgerLink(
                                                        'admin/locations'
                                                    )
                                                    setHamburgerIsOpen(false)
                                                    setAdminDropdownIsOpen(
                                                        false
                                                    )
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <PlaceIcon fontSize="large" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={'Locations'}
                                                />
                                            </ListItemButton>
                                        </DropdownItem>
                                    </List>
                                ) : null}
                            </List>

                            <List>
                                <ListItem>
                                    <ListItemButton
                                        onClick={() => {
                                            handleSignOut()
                                            setHamburgerIsOpen(false)
                                        }}
                                    >
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="large" />
                                        </ListItemIcon>
                                        <ListItemText primary={'Log out'} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </HamburgerContainer>
                    </Drawer>
                </HeaderWrap>
            </TopBarContainer>
            <Outlet />
        </div>
    )
}

export default TopBar
