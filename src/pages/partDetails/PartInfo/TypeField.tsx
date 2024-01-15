import { Box, ClickAwayListener, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Edit, LabelContainer, StyledTextField, TextBoxWrap, TypeContainer } from './styles';
import { TypeProps } from './types';
import { useState } from 'react';

export const TypeField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,
    options,
}: TypeProps) => {
    const { register } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleClickAway = () => {
        setIsOpen(false);
    };
    const handleEditClick = () => {
        setIsOpen(true);
    };

    return (
        <TextBoxWrap>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{label.toUpperCase()}</strong>
                        </label>
                        <Edit onClick={handleEditClick} />
                    </LabelContainer>
                    <TypeContainer>
                        <StyledTextField
                            {...register(label.toLowerCase())}
                            onBlur={onBlur}
                            select
                            onChange={handleSelectChange}
                            $isOpen={isOpen}
                            fullWidth
                            variant="standard"
                            value={defaultValue}
                            InputProps={{
                                disableUnderline: !isOpen,
                                readOnly: !isOpen,
                            }}
                        >
                            {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </StyledTextField>
                    </TypeContainer>
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    );
};
