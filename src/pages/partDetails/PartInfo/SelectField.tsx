import { TextField } from '@mui/material'
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
    children,
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
                        setActiveEditMode((prevMode) =>
                            prevMode === label ? null : label
                        )
                    }
                />
            </LabelContainer>
            <TypeContainer>
                <TextField
                    {...register(label.toLowerCase())}
                    onBlur={onBlur}
                    select
                    onChange={handleSelectChange}
                    variant="standard"
                    fullWidth
                    value={defaultValue}
                    InputProps={{
                        disableUnderline: activeEditMode !== label,
                        readOnly: activeEditMode !== label,
                    }}
                >
                    {children} 
                </TextField>
            </TypeContainer>
        </TextBoxWrap>
    )
}
