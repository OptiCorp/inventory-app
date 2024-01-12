import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router'

const userService = () => {
    const { instance } = useMsal()
    const navigate = useNavigate()
    const signOut = () => {
        navigate('/')
        instance.logoutPopup().catch((error) => {
            console.log('Failed to logout: ', error)
        })
    }

    return {
        signOut,
    }
}

export default userService
