import { ActionFunctionArgs, Form, Outlet, redirect, useActionData } from "react-router-dom"
import apiService from "../../services/api";

type response = {
    error: string
}

const AddPart = () => {
    const data = useActionData() as response;

    return (
        <Outlet />
        // <FormContainer>
        //     <PartForm method="post" action="/addpart" autoComplete="off">

        //         {data && data.error && <p>{data.error}</p>}
        //         <ProgressBar />


        //         <input list="types" name="type" placeholder="Item type" />
        //         <datalist id="types">
        //             <option value="Unit" />
        //             <option value="Assembly" />
        //             <option value="Sub-assembly" />
        //             <option value="Item" />
        //         </datalist>
        //         <input type="text" name="desc" placeholder="Item description" />
        //         <input type="text" name="serial" placeholder="Serial number" />
        //         <input type="text" name="product" placeholder="Product number" />
        //         <input type="text" name="vendor" placeholder="Vendor" />
        //         <input type="text" name="comment" placeholder="Comment" />
        //         <button>Submit</button>

        //     </PartForm>
        // </FormContainer>
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

        // const res = await api.addAssembly(
        //     part)


        return redirect('/search')
    }
    return { error: 'All fields must be filled out' }

}

export default AddPart
