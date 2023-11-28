import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'
import SnackbarComponent from './utils/Snackbar'
import TopBar from './components/topBar/TopBar'
import Search from './pages/search/Search'
import PartDetails from './pages/partDetails/PartDetails'
import AddPart from './pages/addPart/AddPart'
import MakeList from './pages/list/MakeList'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UmAppContextProvider } from './contexts/UmAppContext'
import RecentlyAdded from "./pages/addPart/RecentlyAdded.tsx";
import BatchForm from "./pages/addPart/BatchForm.tsx";
import CheckForm from './pages/addPart/CheckForm.tsx'
import Upload from "./pages/addPart/Upload.tsx";
import AddPartForm, { submitPart } from "./pages/addPart/AddPartForm.tsx";

function App() {
    const isAuthenticated = useIsAuthenticated();
    const queryClient = new QueryClient();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<TopBar />}>
                <Route
                    path='search'
                    element={<Search />}
                />
                <Route
                    path=':id'
                    element={<PartDetails />}
                />
                <Route
                    path='add-part'
                    element={<AddPart />}
                >
                    <Route
                        index
                        element={<RecentlyAdded />}
                    />
                    <Route
                        path='batch'
                        element={<BatchForm />}
                    />
                    <Route
                            path='checks'
                            element={<CheckForm />}
                    />
                    <Route
                        path='upload'
                        element={<Upload />}
                    />
                    <Route
                        path='add-form'
                        element={<AddPartForm />}
                        action={submitPart}
                    />
                </Route>
                <Route
                    path='makelist'
                    element={<MakeList />}
                />
            </Route>
        )
    )

    return (
        <QueryClientProvider client={queryClient}>
            <div className="wrapper">
                {isAuthenticated && (
                    <UmAppContextProvider>
                        <SnackbarComponent />

                        <RouterProvider router={router} />
                    </UmAppContextProvider>
                )}
                {!isAuthenticated && <Login />}
            </div>
        </QueryClientProvider>
    )
}

export default App
