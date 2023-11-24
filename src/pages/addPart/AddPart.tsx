import { ActionFunctionArgs, Form, Outlet, redirect, useActionData } from "react-router-dom"
import apiService from "../../services/api";

type response = {
    error: string
}

const AddPart = () => {
    const data = useActionData() as response;

    return (
        <Outlet />
   
    )
}

export const submitPart = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData();
    const api = apiService()

    const serialNumber = data.get('serial')
    const productNumber = data.get('product')
    const description = data.get('desc')
    const vendor = data.get('vendor')
    const type = data.get('type')?.toString().toLowerCase();

    if (!(type === 'unit' || type === 'assembly' || type === 'sub-assembly' || type === 'item')) {
        return { error: 'Type must be Unit, Assembly, Sub-assembly or Item' }
    }

    if (serialNumber && productNumber && description && vendor) {
        const part = {
            WPId: 'skagj-32-dfhg',
            SerialNumber: serialNumber.toString(),
            ProductNumber: productNumber.toString(),
            Description: description.toString(),
            Vendor: vendor.toString(),
            AddedById: 'ad50ebc3-260a-4798-bc7b-7dd62cfb817e',
            CreatedDate: '2023-11-17T08:22:12.3333333'
        }

  

        return redirect('/search')
    }
    return { error: 'All fields must be filled out' }

}

export default AddPart
