import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap } from './styles'

export const WpId = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    return (
        <>
            <InputWrap>
                <label htmlFor="WellPartner Id">
                    WellPartner Id{' '}
                    <ErrorMessage
                        name="wpId"
                        render={({ message }) => <ErrorP>{message}</ErrorP>}
                    />
                </label>{' '}
            </InputWrap>
            <input
                type="text"
                placeholder="wpId"
                {...register('wpId')}
                autoComplete="off"
            />
        </>
    )
}
