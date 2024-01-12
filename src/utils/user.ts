import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router'

const useUserService = () => {
    const { instance } = useMsal()
    const navigate = useNavigate()
    const signOut = () => {
        navigate('/')
        instance.logoutPopup().catch((error) => {
            console.error('Failed to logout: ', error)
        })
    }

    return {
        signOut,
    }
}

export default useUserService
