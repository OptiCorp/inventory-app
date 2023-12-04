import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Comment } from '../../../components/AddPartFormFields/Comment/Comment'
import { Description } from '../../../components/AddPartFormFields/Description'
import { ProductNumber } from '../../../components/AddPartFormFields/ProductNumber'
import { SerialNumber } from '../../../components/AddPartFormFields/SerialNumber'
import { Types } from '../../../components/AddPartFormFields/Types/Types'
import { Vendor } from '../../../components/AddPartFormFields/Vendor/Vendor'
import { WpId } from '../../../components/AddPartFormFields/WpId'
import UmAppContext from '../../../contexts/UmAppContext'

export const FormContent = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const { currentUser } = useContext(UmAppContext)

    return (
        <>
            <Types />
            <WpId />
            <SerialNumber />
            <ProductNumber />
            <Description />
            <Vendor />
            <Comment />

            <input
                type="text"
                defaultValue={currentUser?.id}
                style={{ display: 'none' }}
                {...register('addedById', { value: currentUser?.id })}
            />
        </>
    )
}
