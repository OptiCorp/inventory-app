import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MsalProvider } from '@azure/msal-react'
import { pca } from './msalConfig.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MsalProvider instance={pca}>
                <App />
            </MsalProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
)
