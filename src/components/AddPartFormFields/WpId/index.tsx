import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap, StyledInput } from './styles'

export const WpId = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="WellPartner Id">WellPartner Id </label>{' '}
                <ErrorMessage
                    name="wpId"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="E.g 5321-1"
                {...register('wpId')}
                autoComplete="off"
            />
        </>
    )
}
