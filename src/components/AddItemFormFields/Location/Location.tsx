import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, TextField } from '@mui/material';
import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator.ts';
import { Location as LocationType } from '../../../services/apiTypes.ts';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

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
                    <label htmlFor="location">Choose a location</label>{' '}
                    <ToolTip content="Specify a location">
                        <FaRegQuestionCircleIcon />
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
