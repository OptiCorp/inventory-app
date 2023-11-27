import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'

import TopBar from './components/topBar/TopBar'
import Search from './pages/search/Search'
import PartDetails from './pages/partDetails/Index'
import AddPart, { submitPart } from './pages/addPart/AddPart'
import MakeList from './pages/list/MakeList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import RecentlyAdded from './components/recentlyAdded/RecentlyAdded'
import { UmAppContextProvider } from './contexts/UmAppContext'
import GlobalStyles from './style/GlobalStyles'

function App() {
    const isAuthenticated = useIsAuthenticated()
    const queryClient = new QueryClient()

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<TopBar />}>
                <Route path="search/:searchParam?" element={<Search />} />

                <Route path=":partId" element={<PartDetails />} />
                <Route path="addpart" element={<AddPart />} action={submitPart}>
                    <Route index element={<RecentlyAdded />} />
                </Route>
                <Route path="makelist" element={<MakeList />} />
            </Route>
        )
    )

    return (
        <QueryClientProvider client={queryClient}>
            <div className="wrapper">
                {isAuthenticated && (
                    <UmAppContextProvider>
                        <GlobalStyles />

                        <RouterProvider router={router} />
                    </UmAppContextProvider>
                )}
                {!isAuthenticated && <Login />}
            </div>
        </QueryClientProvider>
    )
}

export default App
