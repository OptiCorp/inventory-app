import { useIsAuthenticated } from '@azure/msal-react'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'
import { Login } from './pages/login/Login.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TopBar } from './components/TopBar/TopBar.tsx'
import { UmAppContextProvider } from './contexts/UmAppContext'
import AddPart from './pages/addPart/Index'
import { AddPartFormm } from './pages/addPart/addPartForm/AddPartForm'
import BatchForm from './pages/addPart/batch/BatchForm'
import CheckForm from './pages/addPart/check/CheckForm'
import Upload from './pages/addPart/documentation/Upload'
import RecentlyAdded from './pages/addPart/recentlyAdded/RecentlyAdded'
import Categories from './pages/admin/category/Categories.tsx'
import Locations from './pages/admin/location/Locations.tsx'
import Vendors from './pages/admin/vendor/Vendors.tsx'
import MakeList from './pages/list/MakeList'
import ListDetails from './pages/listDetails/ListDetails.tsx'
import PartDetails from './pages/partDetails/Index'
import Search from './pages/search/Search'
import GlobalStyles from './style/GlobalStyles'

import { useSnackBar } from './hooks/useSnackbar.tsx'
import { useWindowDimensions } from './hooks/useWindowDimensions.ts'
import AddCategory from './pages/admin/category/AddCategory.tsx'
import AddLocation from './pages/admin/location/AddLocation.tsx'
import AddVendor from './pages/admin/vendor/AddVendor.tsx'
import Index from './pages/listDetails/phone/Tabs.tsx'

function App() {
    const isAuthenticated = useIsAuthenticated()
    const queryClient = new QueryClient()
    const { width } = useWindowDimensions()
    const { snackbar } = useSnackBar()

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<TopBar />}>
                <Route path="/" element={<Search />} />
                <Route path="search/:searchParam?" element={<Search />} />

                <Route path=":id" element={<PartDetails />} />
                <Route path="add-part" element={<AddPart />}>
                    <Route index element={<RecentlyAdded />} />
                    <Route path="batch" element={<BatchForm />} />
                    <Route path="checks" element={<CheckForm />} />
                    <Route path="upload" element={<Upload />} />
                    <Route path="add-form" element={<AddPartFormm />} />
                </Route>
                <Route path="makelist" element={<MakeList />} />

                {width > 800 ? (
                    <Route path="makelist/:listId?" element={<ListDetails />} />
                ) : (
                    <Route path="makelist/:listId?" element={<Index />} />
                )}

                <Route path="admin">
                    <Route path="categories" element={<Categories />} />
                    <Route path="add-category" element={<AddCategory />} />
                    <Route path="vendors" element={<Vendors />} />
                    <Route path="add-vendor" element={<AddVendor />} />
                    <Route path="locations" element={<Locations />} />
                    <Route path="add-location" element={<AddLocation />} />
                </Route>
            </Route>
        )
    )

    return (
        <QueryClientProvider client={queryClient}>
            <div className="wrapper">
                {isAuthenticated && (
                    <UmAppContextProvider>
                        <GlobalStyles width={width} />
                        {snackbar}

                        <RouterProvider router={router} />
                    </UmAppContextProvider>
                )}
                {!isAuthenticated && <Login />}
            </div>
        </QueryClientProvider>
    )
}

export default App
