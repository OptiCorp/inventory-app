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
    parentId: string | null
    vendor: string
    addedById: string | null
    addedByFirstName: string
    addedByLastName: string
    comment: string | null
    listId: string | null
    parent: Item | null
    children: Item[] | null
    createdDate: string
    updatedDate: string | null
}

export type List = {
    id: string
    title: string
    createdById: string
    createdDate: string
    updatedDate: string | null
    items: string[] | null
}

export type AddList = {
    createdById: string
    title: string
}

export type MutateItemList = {
    listId: string
    itemId: string
}

export type AddItem = {
    wpId: string
    serialNumber: string
    productNumber: string
    type: string
    location?: string | null
    description: string
    parentId?: string | null
    vendor: string
    addedById: string | null
    comment?: string | null
}

export type UpdateItem = {
    id: string
    wpId: string
    serialNumber: string
    productNumber: string
    type: string
    location?: string | null
    description: string
    parentId?: string | null
    vendor: string
    addedById: string | null
    comment?: string | null
}
