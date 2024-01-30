import { ErrorMessage } from '@hookform/error-message';
import { FC, useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';

import { Autocomplete, TextField } from '@mui/material';
import { PartSchema } from '../../../pages/addPart/hooks/partValidator.ts';
import { FormOption, ItemTemplate } from '../../../services/apiTypes.ts';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';
import { StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Type: FC = () => {
    const { control, watch, setValue } = useFormContext<PartSchema>();
    const selectedTemplate = watch('templateData') as ItemTemplate | undefined;
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

        name: 'type',
    });

    useEffect(() => {
        if (selectedTemplate) {
            if (selectedTemplate.type) {
                setValue('type', selectedTemplate.type);
            }
        }
    }, [selectedTemplate?.type]);

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
                value={value}
                defaultValue={
                    selectedTemplate?.type
                        ? { value: selectedTemplate.type, label: selectedTemplate.type }
                        : null
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                disabled={selectedTemplate?.type ? true : false}
                onChange={(_event, newValue) => {
                    onChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Types" variant="outlined" />}
            />
        </>
    );
};
