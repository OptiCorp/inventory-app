import { ErrorMessage } from '@hookform/error-message';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';

import { Autocomplete, TextField } from '@mui/material';
import { PartSchema } from '../../../pages/addPart/hooks/partValidator.ts';
import { FormOption } from '../../../services/apiTypes.ts';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Type: FC = () => {
    const { control, watch } = useFormContext<PartSchema>();
    const selectedTemplate = watch('itemTemplateId');
    const options: FormOption[] = [
        { value: 'unit', label: 'Unit' },
        { value: 'assembly', label: 'Assembly' },
        { value: 'subassembly', label: 'Subassembly' },
        { value: 'part', label: 'Part' },
    ];

    const {
        field: { onChange, value },
    } = useController({
        control,

        name: 'itemTemplate.type',
    });

    const selectedType = options.find((option) => option.label === value);

    return (
        <>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="type">Choose an item type</label>{' '}
                    <ToolTip content="Specify Unit, or Item (lowest tier)">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="type"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <Autocomplete
                options={options}
                selectOnFocus
                clearOnBlur
                id="controlled-demo"
                sx={{ width: 500 }}
                value={selectedType}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                disabled={!!selectedTemplate}
                onChange={(_event, newValue) => {
                    onChange(newValue?.value);
                }}
                renderInput={(params) => <TextField {...params} label="Types" variant="outlined" />}
            />
        </>
    );
};
