import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const Description = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <label htmlFor="description">Description</label>
            <input
                type="text"
                placeholder="Item description"
                {...register('description')}
            />
            <ErrorMessage
                name="description"
                render={({ message }) => (
                    <p style={{ color: 'red' }}>{message}</p>
                )}
            />
        </div>
    )
}

