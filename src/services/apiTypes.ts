export enum ApiStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type User = {
    id: string
    azureAdUserId: string
    firstName: string
    lastName: string
    email: string
    username: string
    userRole: UserRole
    status: string
    createdDate: string
    updatedDate: string | null
}

export type UserRole = {
    id: string
    name: string
}


export type Item = {
    id: string
    wpId: string
    serialNumber: string
    productNumber: string
    type: string
    location: string | null
    description: string
    parentSubassemblyId: string | null
    vendor: string
    addedById: string | null
    comment: string | null
    createdDate: string
    updatedDate: string | null
}

