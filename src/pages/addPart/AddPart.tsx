import { ActionFunctionArgs, Form, Outlet, redirect, useActionData } from "react-router-dom"
import apiService from "../../services/api";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";
import ProgressBar from "../../components/progressBar/ProgressBar.tsx";



const AddPart = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}


export default AddPart
