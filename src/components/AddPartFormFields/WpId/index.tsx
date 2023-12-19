import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { ErrorP, InputWrap, StyledInput } from './styles'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useIsWpIdUnique } from '../../../services/hooks/Items/useIsWpIdUnique.tsx'
import { useDebounce } from 'usehooks-ts'

export const WpId = () => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext()

    const [wpId, setWpId] = useState(uuid().slice(0, 8))
    const debouncedWpId = useDebounce(wpId, 500)
    const { data: isUnique, isLoading } = useIsWpIdUnique(debouncedWpId)

    return (
        <>
            <InputWrap>
                <label htmlFor="WellPartner Id">WellPartner Id </label>{' '}
                <ErrorMessage name="wpId" render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </InputWrap>
            <StyledInput
                type="text"
                placeholder="E.g 5321-1"
                {...register('wpId')}
                autoComplete="off"
                value={wpId}
                onChange={(e) => setWpId(e.target.value)}
            />
            {isLoading && <p>Checking...</p>}
            {wpId && (
                <>
                    {isUnique === true && (
                        <p style={{ color: 'green' }}>WellPartner Id is unique!</p>
                    )}
                    {isUnique === false && (
                        <p style={{ color: 'red' }}>
                            WellPartner Id is not unique. Please choose a different one.
                        </p>
                    )}
                </>
            )}
        </>
    )
}
