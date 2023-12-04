import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap, StyledInput } from './styles'

export const ProductNumber = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="productNumber">Product number (P/N) </label>{' '}
                <ErrorMessage
                    name="productNumber"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="Product number"
                {...register('productNumber')}
            />
        </>
    )
}
