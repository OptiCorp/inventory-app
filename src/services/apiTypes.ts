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
    productNumber: string;
    categoryId: string;
    vendorId: string;
    locationId: string;
    description: string;
    parentId: string | null;
    addedById: string | null;
    comment: string | null;
    listId: string | null;
    parent: Item | null;
    children: Item[] | null;
    createdDate: string;
    updatedDate: string | null;
    category: Category;
    vendor: Vendor;
    location: Location;
    createdBy: User;
    logEntries: LogEntry[];
    itemTemplate: ItemTemplate;
};

export type ItemTemplate = {
    id: string;
    type: string;
};

export type LogEntry = {
    id: string;
    itemId: string;
    userId: string;
    message: string;
    createdDate: string;
    user: User;
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
    productNumber: string;
    children: Item[] | null;
    categoryId: string | null | undefined;
    locationId?: string | null;
    description: string;
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
    itemId: string;
    files: File[];
};

export type Document = {
    id: string;
    name: string;
    blobRef: string;
    contentType: string;
    bytes: string;
};
