import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import { ToolTip } from '../../ToolTip'
import { ErrorP, IconContainer, InputWrap } from './styles'
import { useEffect, useState } from 'react'
import { FormSelect } from '../FormSelect'
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors.tsx'
import { Vendor as VendorType } from '../../../services/apiTypes.ts'
import { FormOption } from '../../../services/apiTypes.ts'

export const Vendor = () => {
    const { setValue } = useFormContext()

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null)
    const { data: categories = [] } = useGetVendors()

    const vendorOptions = categories.map((vendor: VendorType) => ({
        value: vendor.id,
        label: vendor.name,
    }))

    useEffect(() => {
        setValue('vendorId', selectedOption?.value || '')
    }, [selectedOption, setValue])

    return (
        <div>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="vendor">Choose a vendor</label>{' '}
                    <ToolTip content="Specify a vendor">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage
                    name="vendorId"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <FormSelect
                options={vendorOptions}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </div>
    )
}
