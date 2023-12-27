type Data = {
    value: string
    expiry: number
}

const useLocalStorage = () => {
    const setLocalStorageWithExpiry = (key: string, value: string, ttl_minutes: number) => {
        const now = new Date()

        const data: Data = {
            value: value,
            expiry: now.getTime() + ttl_minutes * 60000,
        }

        localStorage.setItem(key, JSON.stringify(data))
    }

    const getLocalStorageWithExpiry = (key: string) => {
        const dataStr = localStorage.getItem(key)

        if (!dataStr) {
            return null
        }
        console.log(dataStr)
        const data: Data = JSON.parse(dataStr)
        const now = new Date()

        if (data.expiry < now.getTime()) {
            localStorage.removeItem(key)
            return null
        }

        return data.value
    }

    return { setLocalStorageWithExpiry, getLocalStorageWithExpiry }
}

export default useLocalStorage
