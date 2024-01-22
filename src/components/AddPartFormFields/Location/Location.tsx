import { ErrorMessage } from '@hookform/error-message';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { FormOption, Location as LocationType } from '../../../services/apiTypes.ts';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';

import { FormSelect } from '../FormSelect/FormSelect.tsx';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Location = () => {
    const { setValue } = useFormContext();

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(null);
    const { data: categories = [] } = useGetLocations();

    const locationOptions = categories.map((location: LocationType) => ({
        value: location.id,
        label: location.name,
    }));

    useEffect(() => {
        setValue('locationId', selectedOption?.value ?? '');
    }, [selectedOption, setValue]);

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
            <FormSelect
                options={locationOptions}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </StyledDiv>
    );
};
