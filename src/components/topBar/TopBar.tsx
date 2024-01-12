import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import { Button, Drawer } from '@mui/material'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { HamburgerMenu } from './HamburgerMenu'
import { BackButton, HeaderWrap, TopBarContainer } from './styles'
const TopBar = () => {
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false)
    const { listId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const [returnButton, setReturnButton] = useState(false)

    const handleBack = () => {
        if (location.pathname === '/add-part/checks') {
            navigate('/add-part/batch')
        } else if (location.pathname === '/add-part/upload') {
            navigate('/add-part/checks')
        } else if (location.pathname === '/add-part/add-form') {
            navigate('/add-part/upload')
        } else if (location.pathname === `/makelist/${listId}`) {
            navigate('/makelist')
        } else if (location.pathname === '/add-part/batch') {
            navigate('/add-part')
        } else {
            navigate(-1)
        }
    }

    const handleSearchIconClick = () => {
        navigate('/search', {
            state: { resetInputField: true },
        })
    }

    useEffect(() => {
        const excludedRoutes = [
            '/',
            '/search',
            '/add-part',
            '/makelist',

            '/admin/categories',
            '/admin/vendors',
            '/admin/locations',
        ]
        setReturnButton(!excludedRoutes.includes(location.pathname))
    }, [location.pathname])

    return (
        <div>
            <TopBarContainer>
                {returnButton ? (
                    <BackButton onClick={handleBack}>
                        <ArrowBackIcon fontSize="large" onClick={handleBack} />
                    </BackButton>
                ) : (
                    <img
                        alt="logo"
                        src={'/WP 1.svg'}
                        onClick={handleSearchIconClick}
                        width="40"
                        style={{ cursor: 'pointer' }}
                    />
                )}

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
                        <HamburgerMenu setHamburgerIsOpen={setHamburgerIsOpen} />
                    </Drawer>
                </HeaderWrap>
            </TopBarContainer>
            <Outlet />
        </div>
    )
}

export default TopBar
