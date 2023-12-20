import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import { ToolTip } from '../../ToolTip'
import { ErrorP, IconContainer, InputWrap } from './styles'
import { useEffect, useState } from 'react'
import { FormSelect } from '../FormSelect'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations.tsx'
import { Location as LocationType } from '../../../services/apiTypes.ts'
import { FormOption } from '../../../services/apiTypes.ts'

export const Location = () => {
    const { setValue } = useFormContext()

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null)
    const { data: categories = [] } = useGetLocations()

    const locationOptions = categories.map((location: LocationType) => ({
        value: location.id,
        label: location.name,
    }))

    useEffect(() => {
        setValue('locationId', selectedOption?.value || '')
    }, [selectedOption, setValue])

    return (
        <div>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="location">Choose a location</label>{' '}
                    <ToolTip content="Specify a location">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage
                    name="location"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <FormSelect
                options={locationOptions}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </div>
    )
}
