import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, ClickAwayListener, MenuItem, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, LabelContainer, TextBoxWrap, TypeContainer } from './styles'
import { TypeProps } from './types'
import { useState } from 'react'

export const TypeField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,
    options,
}: TypeProps) => {
    const { register } = useFormContext()
    const [isOpen, setIsOpen] = useState(false)

    const handleClickAway = () => {
        setIsOpen(false)
    }
    const handleEditClick = () => {
        setIsOpen(true)
    }

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
                        <TextField
                            {...register(label.toLowerCase())}
                            onBlur={onBlur}
                            select
                            onChange={handleSelectChange}
                            SelectProps={{
                                IconComponent: () => (!isOpen ? null : <ArrowDropDownIcon />),
                            }}
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
                        </TextField>
                    </TypeContainer>
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    )
}
