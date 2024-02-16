import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, TextField } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { Location as LocationType } from '../../../services/apiTypes';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations';
import { ToolTip } from '../../ToolTip/ToolTip';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';

export const Location = () => {
    const { data: categories = [] } = useGetLocations();
    const { control } = useFormContext<ItemSchema>();

    const locationOptions = categories.map((location: LocationType) => ({
        value: location.id,
        label: location.name,
    }));
    const {
        field: { onChange, value },
    } = useController({
        control,

        name: 'locationId',
    });

    const selectedLocation = locationOptions.find((option) => option.label === value);

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="location">Choose a location</label>
                    <ToolTip content="Specify a location">
                        <HelpOutlineIcon fontSize="small" />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="locationId"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <Autocomplete
                options={locationOptions}
                size="small"
                sx={{ width: '100%' }}
                value={selectedLocation}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                onChange={(_event, newValue) => {
                    onChange(newValue?.value);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Location" variant="outlined" />
                )}
            />
        </StyledDiv>
    );
};
