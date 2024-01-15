import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { FormOption, Vendor as VendorType } from '../../../services/apiTypes.ts';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv } from '../Category/styles.ts';
import { FormSelect } from '../FormSelect/FormSelect.tsx';
import { ErrorP, IconContainer, InputWrap } from './styles.ts';

export const Vendor = () => {
    const { setValue } = useFormContext();

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null);
    const { data: categories = [] } = useGetVendors();

    const vendorOptions = categories.map((vendor: VendorType) => ({
        value: vendor.id,
        label: vendor.name,
    }));

    useEffect(() => {
        setValue('vendorId', selectedOption?.value ?? '');
    }, [selectedOption, setValue]);

    return (
        <StyledDiv>
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
        </StyledDiv>
    );
};
