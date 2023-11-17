import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Users from './pages/users/Users'
// import AddUser from './pages/users/AddUser'
import { useIsAuthenticated } from '@azure/msal-react'
import { Login } from './pages/login'
import Layout from './Layout'
import SnackbarComponent from './utils/Snackbar'
import AddUser from './pages/users/AddUser'
import TopBar from './components/topBar/TopBar'
import Search from './pages/search/Search'
import PartDetails from './pages/partDetails/PartDetails'
import AddPart from './pages/addPart/AddPart'
import MakeList from './pages/list/MakeList'

function App() {
    const isAuthenticated = useIsAuthenticated()

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<TopBar />}>
                <Route path='search' element={<Search />} />
                <Route path=':id' element={<PartDetails />} />
                <Route path='addpart' element={<AddPart />} />
                <Route path='makelist' element={<MakeList />} />
            </Route>
        )
    )

    return (
        <div className="wrapper">
            {isAuthenticated && (
                <>
                    <SnackbarComponent />

                    <RouterProvider router={router} />
                </>
            )}
            {!isAuthenticated && <Login />}
        </div>
    )
}

export default App
