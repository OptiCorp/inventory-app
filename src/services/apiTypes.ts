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

export type Part = {
    WPID: string;
    SN: string;
    PN: string;
    Description: string;
    Location: string;
    Vendor: string;
    LastUpdated: string;
}


export type Assembly = {
    id: string
    wpId: string
    serialNumber: string
    productNumber: string
    location: string | null
    description: string
    parentUnitId: string | null
    vendor: string
    addedById: string | null
    comment: string | null
    createdDate: string
    updatedDate: string | null
}

export type Item = {
    Id: string
    WPId: string
    SerialNumber: string
    ProductNumber: string
    Location: string | null
    Description: string
    ParentAssemblyId: string | null
    Vendor: string
    AddedById: string | null
    Comment: string | null
    CreatedDate: string
    UpdatedDate: string | null
}

export type Subassembly = {
    Id: string
    WPId: string
    SerialNumber: string
    ProductNumber: string
    Location: string | null
    Description: string
    ParentAssemblyId: string | null
    ParentSubassemblyId: string | null
    Vendor: string
    AddedById: string | null
    Comment: string | null
    CreatedDate: string
    UpdatedDate: string | null
}

export type Unit = {
    Id: string
    WPId: string
    SerialNumber: string
    ProductNumber: string
    Location: string | null
    Description: string
    Vendor: string
    AddedById: string | null
    Comment: string | null
    CreatedDate: string
    UpdatedDate: string | null
}
