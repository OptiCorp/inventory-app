import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { FormOption, Vendor as VendorType } from '../../../services/apiTypes.ts';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';

import { FormSelect } from '../FormSelect/FormSelect.tsx';

import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';
import { PartSchema } from '../../../pages/addPart/hooks/partValidator.ts';
import { Autocomplete, TextField } from '@mui/material';

export const Vendor = () => {
    const { control, watch } = useFormContext<PartSchema>();

    const selectedTemplate = watch('templateData');

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

            <Autocomplete
                options={vendorOptions}
                disabled={!!selectedTemplate?.id}
                sx={{ width: 500 }}
                value={selectedVendor}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_event, newValue) => {
                    onChange(newValue?.value);
                }}
                renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
            />
        </StyledDiv>
    );
};
