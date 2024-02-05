import { useIsAuthenticated } from '@azure/msal-react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import ResponsiveRoute from './components/ResponsiveRoute/ResponsiveRoute.tsx';
import SnackBar from './components/Snackbar/Snackbar.tsx';
import ResponsiveAppBar from './components/TopBar/ResponsiveAppBar.tsx';
import { AppContextProvider } from './contexts/AppContext';
import { useWindowDimensions } from './hooks/useWindowDimensions.ts';
import AddItem from './pages/addItem/Index';
import { AddItemForm } from './pages/addItem/addItemForm/AddItemForm.tsx';
import BatchForm from './pages/addItem/batch/BatchForm';
import CheckForm from './pages/addItem/check/CheckForm';
import Upload from './pages/addItem/documentation/Upload';
import RecentlyAdded from './pages/addItem/recentlyAdded/RecentlyAdded';
import Template from './pages/addItem/template/Template.tsx';
import AddCategory from './pages/admin/category/AddCategory.tsx';
import Categories from './pages/admin/category/Categories.tsx';
import AddLocation from './pages/admin/location/AddLocation.tsx';
import Locations from './pages/admin/location/Locations.tsx';
import AddVendor from './pages/admin/vendor/AddVendor.tsx';
import Vendors from './pages/admin/vendor/Vendors.tsx';
import ItemDetails from './pages/itemDetails/Index';
import MakeList from './pages/list/MakeList';
import ListDetails from './pages/listDetails/ListDetails.tsx';
import Index from './pages/listDetails/phone/Tabs.tsx';
import { Login } from './pages/login/Login.tsx';
import Search from './pages/search/Search';
import GlobalStyles, { globalTheme } from './style/GlobalStyles';

function App() {
    const isAuthenticated = useIsAuthenticated();
    const queryClient = new QueryClient();
    const { width } = useWindowDimensions();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<ResponsiveAppBar />}>
                <Route path="/" element={<Navigate to="/find-items" />} />
                <Route path="/find-items" element={<Search />} />
                <Route path="search/:searchParam?" element={<Search />} />

                <Route path=":id" element={<ItemDetails />} />
                <Route path="add-item" element={<AddItem />}>
                    <Route index element={<RecentlyAdded />} />
                    <Route path="batch" element={<BatchForm />} />

                    <Route path="checks" element={<CheckForm />} />
                    <Route path="upload" element={<Upload />} />
                    <Route path="template" element={<Template />} />
                    <Route path="add-form" element={<AddItemForm />} />
                </Route>
                <Route path="make-list" element={<MakeList />} />
                <Route
                    path={`make-list/:listId?`}
                    element={
                        <ResponsiveRoute
                            desktopElement={<ListDetails />}
                            mobileElement={<Index />}
                        />
                    }
                />
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
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={globalTheme}>
                <div className="wrapper">
                    {isAuthenticated && (
                        <AppContextProvider>
                            <GlobalStyles width={width} />
                            <SnackBar />
                            <RouterProvider router={router} />
                        </AppContextProvider>
                    )}
                    {!isAuthenticated && <Login />}
                </div>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
