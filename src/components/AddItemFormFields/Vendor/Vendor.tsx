import { ErrorMessage } from '@hookform/error-message';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Autocomplete, TextField } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { Vendor as VendorType } from '../../../services/apiTypes';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';
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
                        <HelpOutlineIcon fontSize="small" />
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
