import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap, StyledInput } from './styles'

export const Description = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="description">Description </label>{' '}
                <ErrorMessage
                    name="description"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="Item description"
                {...register('description')}
            />
        </>
    )
}
