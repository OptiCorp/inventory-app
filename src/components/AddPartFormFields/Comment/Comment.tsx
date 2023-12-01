import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const Comment = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <div>
            <label htmlFor="Comment">Comment</label>
            <input type="text" placeholder="Comment" {...register('comment')} />
            <ErrorMessage
                name="Comment"
                render={({ message }) => (
                    <p style={{ color: 'red' }}>{message}</p>
                )}
            />
        </div>
    )
}
