import { ErrorMessage } from '@hookform/error-message';

import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { Vendor as VendorType } from '../../../services/apiTypes.ts';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';

import { Autocomplete, TextField } from '@mui/material';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator.ts';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Vendor = () => {
    const { control } = useFormContext<ItemSchema>();

    const { data: categories = [] } = useGetVendors();

    const vendorOptions = categories.map((vendor: VendorType) => ({
        value: vendor.id,
        label: vendor.name,
    }));

    const {
        field: { onChange, value },
    } = useController({
        control,
        name: 'vendorId',
    });

    const selectedVendor = vendorOptions.find((option) => option.label === value);

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="vendor">Choose a vendor</label>
                    <ToolTip content="Specify a vendor">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="vendorId"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>

            <Autocomplete
                options={vendorOptions}
                size="small"
                sx={{ width: '100%' }}
                value={selectedVendor}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_event, newValue) => {
                    onChange(newValue?.value);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Vendor" variant="outlined" />
                )}
            />
        </StyledDiv>
    );
};
