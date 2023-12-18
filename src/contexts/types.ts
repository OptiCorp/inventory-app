import { User } from '../services/apiTypes'

export interface UmAppContextType {
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
