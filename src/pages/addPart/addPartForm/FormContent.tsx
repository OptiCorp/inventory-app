import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { Comment } from '../../../components/AddPartFormFields/Comment'
import { Description } from '../../../components/AddPartFormFields/Description'
import { ProductNumber } from '../../../components/AddPartFormFields/ProductNumber'
import { SerialNumber } from '../../../components/AddPartFormFields/SerialNumber'
import { Type } from '../../../components/AddPartFormFields/Type'
import { Vendor } from '../../../components/AddPartFormFields/Vendor'
import { WpId } from '../../../components/AddPartFormFields/WpId'
import { Category } from '../../../components/AddPartFormFields/Category'
import { Location } from '../../../components/AddPartFormFields/Location'
import UmAppContext from '../../../contexts/UmAppContext'

export const FormContent = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const { currentUser } = useContext(UmAppContext)

    return (
        <>
            <Type />
            <Category />
            <WpId />
            <SerialNumber />
            <ProductNumber />
            <Vendor />
            <Location />
            <Description />
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
