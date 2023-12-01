import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const Types = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <label htmlFor="types">Choose a type</label>
            <input
                list="types"
                pattern="unit|assembly|sub-assembly|sart"
                placeholder="Item type"
                {...register('type')}
            />
            <datalist id="types">
                <option value="unit" />
                <option value="assembly" />
                <option value="sub-assembly" />
                <option value="sart" />
            </datalist>
            <ErrorMessage
                name="types"
                render={({ message }) => (
                    <p style={{ color: 'red' }}>{message}</p>
                )}
            />
        </div>
    )
}
