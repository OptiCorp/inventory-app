import { AccountInfo } from '@azure/msal-browser'
import { IMsalContext } from '@azure/msal-react'
import { AlertColor } from '@mui/material'
import { SetState } from '../pages/partDetails/PartInfo/types'
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
    account: AccountInfo | null
    accounts: AccountInfo[]
    instance: IMsalContext['instance']
    currentUser: User | null
}

export type AzureUserInfo = {
    preferred_username: string
    name: string
    oid: string
}
