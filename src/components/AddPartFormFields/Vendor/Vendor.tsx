import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { FormOption, Vendor as VendorType } from '../../../services/apiTypes.ts';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';

import { FormSelect } from '../FormSelect/FormSelect.tsx';

import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

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
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="vendor">Choose a vendor</label>{' '}
                    <ToolTip content="Specify a vendor">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="vendorId"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <FormSelect
                options={vendorOptions}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </StyledDiv>
    );
};
