import { API_URL } from '../config'
import { pca } from '../msalConfig'


import { AddCategory, AddItem, AddList, AddLocation, Category, Item, List, Location, UpdateCateory, UpdateItem, UpdateLocation, User, UserRole, Vendor } from './apiTypes'


const request = {
    scopes: ['063f1617-3dd5-49a2-9323-69b1605fba48/user.read'],
    account: pca.getAllAccounts()[0],
}

const microsoftGraphRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
}
const microsoftGraphUrl = 'https://graph.microsoft.com'

const apiService = () => {
    // Generic function for get requests

    // Microsoft Graph
    const getMsGraphImageByFetch = async (url: string): Promise<string | undefined> => {
        return pca
            .acquireTokenSilent(microsoftGraphRequest)
            .then(async (tokenResponse) => {
                const getOperation = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${tokenResponse.accessToken}`,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                }
                const res = await fetch(
                    `${microsoftGraphUrl}/${url}`,
                    getOperation
                )
                if (res.ok) {
                    const blob = await res.blob()
                    const url = window.URL || window.webkitURL
                    const blobUrl = url.createObjectURL(blob)
                    return blobUrl
                } else {
                    console.error('Get by fetch failed. Url=' + url, res)
                }
            })

    }

    // User Management
    const getByFetch = async <T>(url: string): Promise<T> => {
        return pca.acquireTokenSilent(request).then(async (tokenResponse) => {
            const getOperation = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, getOperation)
            return res.json()
        })
    }

    // Generic function for post requests
    const postByFetch = async <T>(url: string, bodyData: T) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const postOperation = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, postOperation)
            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Generic function for put requests
    const putByFetch = async <T>(url: string, bodyData: T) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const putOperations = {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(bodyData),
            }
            const res = await fetch(`${API_URL}/${url}`, putOperations)

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Generic function for delete requests
    const deleteByFetch = async (url: string) => {
        try {
            const tokenResponse = await pca.acquireTokenSilent(request)
            const deleteOperation = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${API_URL}/${url}`, deleteOperation)

            return res
        } catch (error) {
            console.error('An error occurred:', error)
            throw error
        }
    }

    // Microsoft Graph

    const getUserImage = async () => {
        const data = await getMsGraphImageByFetch('v1.0/me/photo/$value')
        return data
    }

    //USER

    const getAllUsers = async () => {
        const data = await getByFetch('User')
        return data
    }

    const getUser = async (id: string) => {
        const data = await getByFetch(`GetUser?id=${id}`)
        return data
    }

    const getUserByAzureAdUserId = async (id: string) => {
        const data = await getByFetch(`User/ByAzureId/${id}`)
        return data
    }

    const addUser = async (
        user: Omit<
            User,
            'id' | 'status' | 'userRole' | 'createdDate' | 'updatedDate'
        >
    ): Promise<Response> => {
        return await postByFetch('AddUser', {
            ...user,
        })
    }

    const updateUser = async (
        id: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        userRoleId: string,
        status: string
    ) => {
        return postByFetch('UpdateUser', {
            id: id,
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userRoleId: userRoleId,
            status: status,
        })
    }

    const softDeleteUser = (id: string) => {
        return deleteByFetch(`SoftDeleteUser?=${id}`)
    }

    const hardDeleteUser = (id: string) => {
        return deleteByFetch(`HardDeleteUser?id=${id}`)
    }

    // USER ROLE

    const getAllUserRoles = async (): Promise<UserRole[]> => {
        const data = await getByFetch<UserRole[]>('GetAllUserRoles')
        return data
    }

    const getUserRole = async (id: string): Promise<UserRole> => {
        const data = await getByFetch<UserRole>(`GetUserRole?id=${id}`)
        return data
    }

    const addUserRole = async (
        userRole: Pick<UserRole, 'name'>
    ): Promise<void> => {
        await postByFetch('AddUserRole', {
            userRole,
        })
    }
    const updateUserRole = async (
        id: string,
        name: string
    ): Promise<Response> => {
        return await postByFetch('UpdateUserRole', {
            id: id,
            name: name,
        })
    }

    const deleteUserRole = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUserRole?id=${id}`)
    }

    const getItemsBySearchString = async (
        searchString: string,
        pageNumber: number
    ): Promise<Item[]> => {
        return await getByFetch(`Item/BySearchString/${searchString}?page=${pageNumber}`)
    }

    const getListsBySearchString = async (
        searchString: string,
        userId: string | undefined
    ): Promise<List[]> => {
        return await getByFetch(
            `List/BySearchString/${searchString}?userId=${userId}`
        )
    }

    const getItemsNotInListBySearchString = async (
        searchString: string,
        listId: string,
        pageNumber: number
    ): Promise<Item[]> => {
        return await getByFetch(`Item/BySearchStringNotInList/${searchString}?listId=${listId}&page=${pageNumber}`)
    }

    const getListsByUserId = async (userId: string): Promise<List[]> => {
        return await getByFetch(`List/ByUserId/${userId}`)
    }

    const getListById = async (id: string): Promise<List> => {
        return await getByFetch(`List/${id}`)
    }

    const getItemsByUserId = async (
        userId: string | undefined
    ): Promise<Item[]> => {
        return await getByFetch(`Item/ByUserId/${userId}`)
    }

    const getItemById = async (id: string): Promise<Item> => {
        return await getByFetch(`Item/${id}`)
    }
    
    const updateItemById = async (id: string, item: UpdateItem, updatedById: string): Promise<Response> => {
        return await putByFetch(`Item/${id}?updatedById=${updatedById}`, item)
    }

    const addList = async (list: AddList): Promise<Response> => {
        return await postByFetch(`List`, list)
    }

    const deleteList = async (listId: string): Promise<Response> => {
        return await deleteByFetch(`List/${listId}`)
    }

    const addItem = async (item: AddItem[]): Promise<Response> => {
        return await postByFetch(`Item`, item)
    }

    const addItemsToList = async (listId: string, itemId: string): Promise<Response> => {
        return await postByFetch(`List/AddItems/?listId=${listId}`, [itemId])
    }

    const removeItemsFromList = async (listId: string, itemId: string): Promise<Response> => {
        return await postByFetch(`List/RemoveItems/?listId=${listId}`, [itemId])
    }

    // Location
    const getLocation = async (): Promise<Location[]> => {
        const data: Location[] =  await getByFetch('Location')
        return data
    }

    const getLocationById = async (id: string) => {
        return await getByFetch(`Location/${id}`)
    }

    const getLocationBySearchString = async (searchString: string) => {
        return await getByFetch(`Location/${searchString}`)
    }

    const addLocation = async (location: AddLocation): Promise<Response> => {
        return await postByFetch('Location', location)
    }

    const updateLocationById = async (id: string, location: UpdateLocation): Promise<Response> => {
        return await putByFetch(`Location/${id}`, location)
    }

    const deleteLocation = async (id: string) => {
        return await deleteByFetch(`Location/${id}`)
    }

    // Vendor
    const getVendor = async (): Promise<Vendor[]> => {
        const data =  await getByFetch<Vendor[]>('Vendor')

        return data
    }

    const getVendorById = async (id: string) => {
        return await getByFetch(`Vendor/${id}`)
    }

    const getVendorBySearchString = async (searchString: string) => {
        return await getByFetch(`Vendor/${searchString}`)
    }

    const addVendor = async (vendor: Omit<Vendor, 'id'>): Promise<Response> => {
        return await postByFetch('Vendor', vendor)
    }


    const updateVendorById = async (id: string, vendor: Vendor): Promise<Response> => {
        return await putByFetch(`Vendor/${id}`, vendor)
    }

    const deleteVendor = async (id: string) => {
        return await deleteByFetch(`Vendor/${id}`)
    }

    // Category
    
    const getCategory = async (): Promise<Category[]> => {
        const data: Category[] =  await getByFetch('Category')
        return data
    }

    const getCategoryById = async (id: string) => {
        return await getByFetch(`Category/${id}`)
    }

    const getCategoryBySearchString = async (searchString: string) => {
        return await getByFetch(`Category/${searchString}`)
    }

    const addCategory = async (category: AddCategory): Promise<Response> => {
        return await postByFetch('Category', category)
    }

    const updateCategoryById = async (id: string, category: UpdateCateory): Promise<Response> => {
        return await putByFetch(`Category/${id}`, category)
    }

    const deleteCategory = async (id: string) => {
        return await deleteByFetch(`Category/${id}`)
    }




    return {
        getAllUsers,
        getUser,
        getUserByAzureAdUserId,
        addUser,
        updateUser,
        softDeleteUser,
        hardDeleteUser,
        getAllUserRoles,
        getUserRole,
        addUserRole,
        updateUserRole,
        deleteUserRole,
        getUserImage,
        getItemsBySearchString,
        getItemsNotInListBySearchString,
        getItemsByUserId,
        addItem,
        getListsBySearchString,
        getListsByUserId,
        addList,
        deleteList,
        getItemById,
        updateItemById,
        getListById,
        addItemsToList,
        removeItemsFromList,
        getVendor,
        getVendorById,
        getVendorBySearchString,
        addVendor,
        updateVendorById,
        deleteVendor,
        getLocation,
        getLocationById,
        getLocationBySearchString,
        addLocation,
        updateLocationById,
        deleteLocation,
        getCategory,
        getCategoryById,
        getCategoryBySearchString,
        addCategory,
        updateCategoryById,
        deleteCategory,
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
