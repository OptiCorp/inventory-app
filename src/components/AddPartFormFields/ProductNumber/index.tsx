import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const ProductNumber = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <label htmlFor="productNumber">Product Number</label>
            <input
                type="text"
                placeholder="Product number"
                {...register('productNumber')}
            />
            <ErrorMessage
                name="productNumber"
                render={({ message }) => (
                    <p style={{ color: 'red' }}>{message}</p>
                )}
            />
        </div>
    )
}
