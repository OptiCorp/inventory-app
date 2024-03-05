import { MsalProvider } from '@azure/msal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { pca } from './msalConfig';
import { AppContainer, BodyWrapper } from './styles';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MsalProvider instance={pca}>
                <BodyWrapper>
                    <AppContainer>
                        <App />
                    </AppContainer>
                </BodyWrapper>
            </MsalProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
