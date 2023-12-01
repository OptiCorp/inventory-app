import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap, StyledInput } from './styles'

export const Vendor = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="vendor">Name of vendor </label>{' '}
                <ErrorMessage
                    name="vendor"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="Vendor"
                {...register('vendor')}
            />
        </>
    )
}
