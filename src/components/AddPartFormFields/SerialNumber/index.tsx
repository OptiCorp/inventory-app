import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap } from './styles'

export const SerialNumber = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="Serial number">
                    Serial Number{' '}
                    <ErrorMessage
                        name="serialNumber"
                        render={({ message }) => <ErrorP>{message}</ErrorP>}
                    />
                </label>{' '}
            </InputWrap>
            <input
                type="text"
                placeholder="Serial number"
                {...register('serialNumber')}
            />
        </>
    )
}
