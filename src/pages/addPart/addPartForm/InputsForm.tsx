import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import UmAppContext from '../../../contexts/UmAppContext'

export const InputsForm = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const { currentUser } = useContext(UmAppContext)
    return (
        <>
            <input
                type="text"
                aria-label={errors.root?.message}
                placeholder="Item description"
                {...register('description', {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Serial number"
                {...register('serialNumber', {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Product number"
                {...register('productNumber', {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Vendor"
                {...register('vendor', {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Comment"
                {...register('comment', {
                    required: true,
                })}
            />
            <input
                type="text"
                defaultValue={currentUser?.id}
                style={{ display: 'none' }}
                {...(register('firstName', { value: currentUser?.id }),
                { required: true })}
            />
        </>
    )
}
