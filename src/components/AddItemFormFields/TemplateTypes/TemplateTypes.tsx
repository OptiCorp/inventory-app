import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, TextField } from '@mui/material';
import { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { FormOption } from '../../../services/apiTypes';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';

export const Type: FC = () => {
    const { control, watch } = useFormContext<ItemSchema>();
    const selectedTemplate = watch('itemTemplate.id');
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

    const selectedType = options.find(
        (option) => option.label.toLowerCase() === value.toLowerCase()
    );

    return (
        <>
            <StyledDiv>
                <StyledInputWrap>
                    <StyledIconContainer>
                        <label htmlFor="type">Choose an item type</label>
                        <ToolTip content="Specify Unit, or Item (lowest tier)">
                            <HelpOutlineIcon fontSize="small" />
                        </ToolTip>
                    </StyledIconContainer>
                    <ErrorMessage
                        name="itemTemplate.type"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledInputWrap>
                <Autocomplete
                    options={options}
                    selectOnFocus
                    clearOnBlur
                    id="controlled-demo"
                    sx={{ width: '100%' }}
                    size="small"
                    value={selectedType}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    disabled={!!selectedTemplate}
                    onChange={(_event, newValue) => {
                        onChange(newValue?.value);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Types"
                            variant="outlined"
                            sx={{ margin: '0 ' }}
                        />
                    )}
                />
            </StyledDiv>
        </>
    );
};
