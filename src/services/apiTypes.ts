export enum ApiStatus {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type User = {
    id: string;
    azureAdUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    userRole: UserRole;
    status: string;
    createdDate: string;
    updatedDate: string | null;
};

export type UserRole = {
    id: string;
    name: string;
};

export type Item = {
    id: string;
    wpId: string;
    serialNumber: string;
    vendorId: string;
    locationId: string;
    parentId: string | null;
    addedById: string | null;
    comment: string | null;
    listId: string | null;
    parent: Item | null;
    children: Item[] | null;
    createdDate: string;
    updatedDate: string | null;
    vendor: Vendor;
    location: Location;
    createdBy: User;
    logEntries: LogEntry[];
    itemTemplate: ItemTemplate;
};

export type ItemTemplate = {
    id: string;
    type: string;
    productNumber: string;
    categoryId: string;
    category: Category;
    description: string;
};

export type LogEntry = {
    createdBy: User;
    id: string;
    itemId: string;
    userId: string;
    message: string;
    createdDate: string;
};

export type Category = {
    id: string;
    name: string;
    userId: string;
};

export type Location = {
    id: string;
    name: string;
    userId: string;
};

export type List = {
    id: string;
    title: string;
    createdById: string;
    createdDate: string;
    updatedDate: string | null;
    items: Item[];
};

export type AddList = {
    createdById: string;
    title: string;
};

export type UpdateList = {
    id: string;
    title: string;
};

export type MutateItemList = {
    listId: string;
    itemId: string;
    addSubItems?: boolean;
};

export type AddItem = {
    wpId: string;
    categoryId: string;
    serialNumber: string;
    productNumber: string;
    type: string;
    locationId?: string | null;
    description: string;
    parentId?: string | null;
    vendorId: string;
    addedById: string | null;
    comment?: string | null;
};

export type UpdateItem = {
    id: string;
    wpId: string;
    serialNumber: string;
    children: Item[] | null;
    locationId?: string | null;
    parentId?: string | null;
    vendorId: string;
    addedById: string | null;
    comment?: string | null;
    listId: string | null;
    itemTemplate: ItemTemplate;
};

export type Vendor = {
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    addedById: string;
};

export type AddVendor = {
    name: string;
    addedById: string;
};

export type UpdateVendor = {
    id: string;
    name: string;
};

export type AddLocation = {
    name: string;
    addedById: string;
};

export type UpdateLocation = {
    id: string;
    name: string;
};

export type AddCategory = {
    name: string;
    addedById: string;
};

export type UpdateCategory = {
    id: string;
    name: string;
};

export type FormOption = {
    value: string;
    label: string;
};

export type AddDocument = {
    file: File;
    documentTypeId: string;
};

export type Document = {
    id: string;
    name: string;
    blobRef: string;
    contentType: string;
    bytes: string;
};

export type DocumentType = {
    id: string;
    name: string;
    description: string;
};
