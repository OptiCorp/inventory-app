import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { MenuItem, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, TextBoxWrap, TypeContainer } from './styles'
import { TypeProps } from './types'

export const TypeField = ({
    handleSelectChange,
    selectedType,
    label,
    defaultValue,
    onBlur,
    setActiveEditMode,
    activeEditMode,
    options,
}: TypeProps) => {
    const { register } = useFormContext()

    return (
        <TextBoxWrap>
            <label>
                <strong>{label.toUpperCase()}</strong>{' '}
            </label>
            <TypeContainer>
                <TextField
                    {...register('type')}
                    onBlur={onBlur}
                    select
                    onChange={handleSelectChange}
                    SelectProps={{
                        IconComponent: () =>
                            activeEditMode !== label ? null : (
                                <ArrowDropDownIcon />
                            ),
                    }}
                    variant="standard"
                    fullWidth
                    value={selectedType ? selectedType : defaultValue}
                    InputProps={{
                        disableUnderline: activeEditMode !== label,
                        readOnly: activeEditMode !== label,
                    }}
                >
                    {options?.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) =>
                            prevMode === label ? null : label
                        )
                    }
                />
            </TypeContainer>
        </TextBoxWrap>
    )
}
