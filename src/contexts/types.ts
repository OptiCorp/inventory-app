import { AlertColor } from '@mui/material'
import { SetState } from '../pages/partDetails/partInfo/types'
import { User } from '../services/apiTypes'

export interface UmAppContextType {
    snackbarText: string
    // setSnackbarText: (snackbarText: string) => void
    setSnackbarText: SetState<string>
    showSnackbar: boolean
    setShowSnackbar: (showSnackbar: boolean) => void
    snackbarSeverity: AlertColor
    setSnackbarSeverity: SetState<AlertColor>

    // setSnackbarSeverity: (
    //     AlertColor: 'success' | 'info' | 'warning' | 'error'
    // ) => void
    idToken: string
    accessToken: string
    account: any
    accounts: any
    instance: any
    currentUser: User | null
}

export type AzureUserInfo = {
    preferred_username: string
    name: string
    oid: string
}
