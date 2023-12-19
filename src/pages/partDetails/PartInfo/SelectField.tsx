import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, ClickAwayListener, MenuItem, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, LabelContainer } from './styles'
import { SelectProps } from './types'
import { useState } from 'react'

export const SelectField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,

    options,
}: SelectProps) => {
    const { register } = useFormContext()
    const [open, setOpen] = useState(false)

    const handleClickAway = () => {
        setOpen(false)
    }
    const handleEditClick = () => {
        setOpen(true)
    }

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
                                handleEditClick()
                            }}
                        />
                    </LabelContainer>

                    <TextField
                        {...register(label.toLowerCase())}
                        onBlur={onBlur}
                        select
                        onChange={handleSelectChange}
                        SelectProps={{
                            IconComponent: () => (!open ? null : <ArrowDropDownIcon />),
                        }}
                        variant="standard"
                        value={defaultValue}
                        InputProps={{
                            disableUnderline: !open,
                            readOnly: !open,
                        }}
                    >
                        {options?.map((option) => (
                            <MenuItem key={option.name} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </ClickAwayListener>
        </div>
    )
}
