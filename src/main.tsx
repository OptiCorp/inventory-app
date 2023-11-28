import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MsalProvider } from '@azure/msal-react'
import { pca } from './msalConfig.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <MsalProvider instance={pca}>
      <App />

    </MsalProvider>
  ,
)
