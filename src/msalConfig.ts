import { LogLevel, PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: 'c282f2d3-d4d6-452c-9d3d-70c023bb92fc',
        authority: 'https://login.microsoftonline.com/1a3889b2-f76f-4dd8-831e-b2d5e716c986',
    },
    cache: {
        cacheLocation: 'sessionStorage', // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    scopes: [
        'api://063f1617-3dd5-49a2-9323-69b1605fba48/user.read',
        /* 'https://graph.microsoft.com/User.Read',
        'https://graph.microsoft.com/.default', */
    ],
    system: {
        loggerOptions: {
            loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

export const pca = new PublicClientApplication(msalConfig);
