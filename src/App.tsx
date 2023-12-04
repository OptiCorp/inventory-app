import { useIsAuthenticated } from '@azure/msal-react'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import { Login } from './pages/login'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TopBar from './components/topBar/TopBar'
import { UmAppContextProvider } from './contexts/UmAppContext'
import AddPart from './pages/addPart/Index'
import { AddPartFormm } from './pages/addPart/addPartForm/AddPartForm'
import BatchForm from './pages/addPart/batch/BatchForm'
import CheckForm from './pages/addPart/check/CheckForm'
import Upload from './pages/addPart/documentation/Upload'
import RecentlyAdded from './pages/addPart/recentlyAdded/RecentlyAdded'
import MakeList from './pages/list/MakeList'
import PartDetails from './pages/partDetails/Index'
import Search from './pages/search/Search'
import GlobalStyles from './style/GlobalStyles'

function App() {
    const isAuthenticated = useIsAuthenticated()
    const queryClient = new QueryClient()

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<TopBar />}>
                <Route path="search/:searchParam?" element={<Search />} />

                <Route path=":id/:wpId" element={<PartDetails />} />
                <Route path="add-part" element={<AddPart />}>
                    <Route index element={<RecentlyAdded />} />
                    <Route path="batch" element={<BatchForm />} />
                    <Route path="checks" element={<CheckForm />} />
                    <Route path="upload" element={<Upload />} />
                    <Route
                        path="add-form"
                        element={<AddPartFormm />}
                        // action={submitPart}
                    />
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
