import { InteractionStatus } from '@azure/msal-browser';
import { useAccount, useMsal } from '@azure/msal-react';
import { AlertColor } from '@mui/material';
import decode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';
import { GlobalSpinner } from '../components/GlobalSpinner/GlobalSpinner';
import apiService from '../services/api';
import { ApiStatus, Item, User } from '../services/apiTypes';
import { AppContextType, AzureUserInfo } from './types';

const AppContext = createContext<AppContextType>({} as AppContextType);

export function AppContextProvider({ children }: { children: React.ReactNode }) {
    // snackbar

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

    //msal

    useEffect(() => {
        if (snackbarText?.length < 1) return;
        setShowSnackbar(true);
    }, [snackbarText]);

    const { instance, inProgress, accounts } = useMsal();
    const account = useAccount(accounts[0] || {});
    const api = apiService();

    const [accessToken, setAccessToken] = useState('');
    const [idToken, setIdToken] = useState('');
    const [status, setStatus] = useState<ApiStatus>(ApiStatus.LOADING);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);

    function getUserInfoFromIdToken(token: string): {
        preferredUserName: string;
        name: string;
        oid: string;
    } {
        const decodedToken: AzureUserInfo = decode(token);

        return {
            preferredUserName: decodedToken?.preferred_username || '',
            name: decodedToken.name || '',
            oid: decodedToken.oid,
        };
    }
    async function fetchUserByEmail(azureAdId: string) {
        const response = await api.getUserByAzureAdUserId(azureAdId);
        if (response) {
            const user = response as User;
            setCurrentUser(user);
        } else {
            console.error('Error fetching user by email');
        }
    }

    const fetchUserAndUpdateContext = async (token: string) => {
        setStatus(ApiStatus.LOADING);
        try {
            const userInfo = getUserInfoFromIdToken(token);
            await fetchUserByEmail(userInfo.oid);
            setStatus(ApiStatus.SUCCESS);
        } catch (error) {
            console.error('Error fetching and updating user:', error);
            setStatus(ApiStatus.ERROR);
        }
    };

    useEffect(() => {
        if (idToken) {
            fetchUserAndUpdateContext(idToken)
                .then(() => {
                    console.info('User fetched and context updated');
                })
                .catch((error) => {
                    console.error('Error fetching and updating user:', error);
                });
        }
    }, [idToken]);

    useEffect(() => {
        if (inProgress === InteractionStatus.None) {
            instance.setActiveAccount(account);
            const accessTokenRequest = {
                scopes: ['https://graph.microsoft.com/.default'],
                account: accounts.at(0),
            };
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((tokenResponse) => {
                    setAccessToken(tokenResponse.accessToken);
                    setIdToken(tokenResponse.idToken);
                })
                .catch((err) => {
                    console.error(err);
                    instance.loginRedirect().catch((error) => {
                        console.error('Failed to redirect', error);
                    });
                });
        } else {
            console.error('No account is available');
        }
    }, [account, inProgress, instance]);

    if (status === ApiStatus.LOADING) {
        return <GlobalSpinner />;
    }

    if (accounts.length > 0) {
        return (
            <AppContext.Provider
                value={{
                    showSnackbar,
                    setShowSnackbar,
                    snackbarText,
                    setSnackbarText,
                    snackbarSeverity,
                    setSnackbarSeverity,
                    account,
                    idToken,
                    accessToken,
                    accounts,
                    instance,
                    currentUser,
                    currentItem,
                    setCurrentItem,
                }}
            >
                {children}
            </AppContext.Provider>
        );
    }
}

export default AppContext;
