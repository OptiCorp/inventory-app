import { useMsal } from '@azure/msal-react'
import AddIcon from '@mui/icons-material/Add'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import BusinessIcon from '@mui/icons-material/Business'
import CategoryIcon from '@mui/icons-material/Category'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import PlaceIcon from '@mui/icons-material/Place'
import SearchIcon from '@mui/icons-material/Search'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DropdownItem, HamburgerContainer } from './styles'

type Props = {
    setHamburgerIsOpen: (hamburgerOpen: boolean) => void
}

export const HamburgerMenu = ({ setHamburgerIsOpen }: Props) => {
    const [adminDropdownIsOpen, setAdminDropdownIsOpen] = useState(false)
    const navigate = useNavigate()
    const hamburgerLink = (location: string) => {
        navigate(location)
    }
    const { id } = useParams() as { id: string }

    const { instance } = useMsal()
    const handleSignOut = () => {
        navigate('/')
        instance.logoutPopup()
    }

    return (
        <>
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

                    <ListItem style={{ padding: '8px 16px 0 16px' }}>
                        <ListItemButton
                            onClick={() => {
                                setAdminDropdownIsOpen(!adminDropdownIsOpen)
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
                                        hamburgerLink('admin/categories')
                                        setHamburgerIsOpen(false)
                                        setAdminDropdownIsOpen(false)
                                    }}
                                >
                                    <ListItemIcon>
                                        <CategoryIcon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={'Categories'} />
                                </ListItemButton>
                            </DropdownItem>

                            <DropdownItem>
                                <ListItemButton
                                    onClick={() => {
                                        hamburgerLink('admin/vendors')
                                        setHamburgerIsOpen(false)
                                        setAdminDropdownIsOpen(false)
                                    }}
                                >
                                    <ListItemIcon>
                                        <BusinessIcon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={'Vendors'} />
                                </ListItemButton>
                            </DropdownItem>

                            <DropdownItem>
                                <ListItemButton
                                    onClick={() => {
                                        hamburgerLink('admin/locations')
                                        setHamburgerIsOpen(false)
                                        setAdminDropdownIsOpen(false)
                                    }}
                                >
                                    <ListItemIcon>
                                        <PlaceIcon fontSize="large" />
                                    </ListItemIcon>
                                    <ListItemText primary={'Locations'} />
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
        </>
    )
}
