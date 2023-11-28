import { API_URL } from '../config'
import { pca } from '../msalConfig'
import { User, UserRole, Item } from './apiTypes'

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
    const getMsGraphImageByFetch = async (url: string): Promise<any> => {
        return pca.acquireTokenSilent(microsoftGraphRequest).then(async (tokenResponse) => {
            const getOperation = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            }
            const res = await fetch(`${microsoftGraphUrl}/${url}`, getOperation)
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
    const getByFetch = async (url: string): Promise<any> => {
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
    const postByFetch = async (url: string, bodyData?: any) => {
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
        user: Omit<User, 'id' | 'status' | 'userRole' | 'createdDate' | 'updatedDate'>
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
        const data = await getByFetch('GetAllUserRoles')
        return data
    }

    const getUserRole = async (id: string): Promise<UserRole> => {
        const data = await getByFetch(`GetUserRole?id=${id}`)
        return data
    }

    const addUserRole = async (userRole: Pick<UserRole, 'name'>): Promise<void> => {
        await postByFetch('AddUserRole', {
            userRole,
        })
    }
    const updateUserRole = async (id: string, name: string): Promise<Response> => {
        return await postByFetch('UpdateUserRole', {
            id: id,
            name: name,
        })
    }

    const deleteUserRole = async (id: string): Promise<void> => {
        await deleteByFetch(`DeleteUserRole?id=${id}`)
    }

    const getItemsBySearchString = async (searchString: string): Promise<Item[]> => {
        return await getByFetch(`Item/BySearchString/${searchString}`)
    }

    const getItemsByUserId = async (userId: string): Promise<Item[]> => {
        return await getByFetch(`Item/ByUserId/${userId}`)
    }

    const addItem = async (item: {
        WPId: string,
        SerialNumber: string,
        ProductNumber: string,
        Type: string,
        Description: string,
        Vendor: string,
        AddedById: string
    }): Promise<Response> => {
        return await postByFetch(`Item`, item)
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
        getItemsByUserId,
        addItem
    }
}

export type ApiService = ReturnType<typeof apiService>

export default apiService
