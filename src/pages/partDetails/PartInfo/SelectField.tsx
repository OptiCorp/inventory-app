import { Box, ClickAwayListener, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Edit, LabelContainer, StyledTextField } from './styles';
import { SelectProps } from './types';
import { useState } from 'react';

export const SelectField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,
    options,
}: SelectProps) => {
    const { register } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleClickAway = () => {
        setIsOpen(false);
    };

    const handleEditClick = () => {
        setIsOpen(true);
    };

    return (
        <div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{label.toUpperCase()}</strong>
                        </label>
                        <Edit
                            onClick={() => {
                                handleEditClick();
                            }}
                        />
                    </LabelContainer>

                    <StyledTextField
                        {...register(label.toLowerCase())}
                        onBlur={onBlur}
                        select
                        onChange={handleSelectChange}
                        fullWidth
                        $isOpen={isOpen}
                        variant="standard"
                        value={defaultValue}
                        InputProps={{
                            disableUnderline: !isOpen,
                            readOnly: !isOpen,
                        }}
                    >
                        {options?.map((option) => (
                            <MenuItem key={option.name} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </StyledTextField>
                </Box>
            </ClickAwayListener>
        </div>
    );
};
