import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MsalProvider } from '@azure/msal-react';
import { pca } from './msalConfig.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppContainer, BodyWrapper } from './styles.ts';

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
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
);
