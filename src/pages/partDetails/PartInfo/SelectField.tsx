import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { MenuItem, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, LabelContainer, TextBoxWrap, TypeContainer } from './styles'
import { VendorProps } from './types'

export const SelectField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,
    setActiveEditMode,
    activeEditMode,
    options,
}: VendorProps) => {
    const { register } = useFormContext()

    return (
        <TextBoxWrap>
            <LabelContainer>
                <label>
                    <strong>{label.toUpperCase()}</strong>
                </label>
                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) => (prevMode === label ? null : label))
                    }
                />
            </LabelContainer>
            <TypeContainer>
                <TextField
                    {...register(label.toLowerCase())}
                    onBlur={onBlur}
                    select
                    onChange={handleSelectChange}
                    SelectProps={{
                        IconComponent: () =>
                            activeEditMode !== label ? null : <ArrowDropDownIcon />,
                    }}
                    variant="standard"
                    fullWidth
                    value={defaultValue}
                    InputProps={{
                        disableUnderline: activeEditMode !== label,
                        readOnly: activeEditMode !== label,
                    }}
                >
                    {options?.map((option) => (
                        <MenuItem key={option.name} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </TypeContainer>
        </TextBoxWrap>
    )
}
