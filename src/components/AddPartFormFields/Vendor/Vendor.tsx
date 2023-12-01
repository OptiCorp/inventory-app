import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const Vendor = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <label htmlFor="vendor">vendor</label>
            <input type="text" placeholder="Vendor" {...register('vendor')} />
            <ErrorMessage
                name="vendor"
                render={({ message }) => (
                    <p style={{ color: 'red' }}>{message}</p>
                )}
            />
        </div>
    )
}
