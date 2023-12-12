import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, InfoContainer } from './styles'
import { EditableFieldProps } from './types'

/* import { Controller, useFormContext } from 'react-hook-form' */

const EditableField = ({
    label,
    defaultValue,
    onBlur,
    activeEditMode,
    setActiveEditMode,
    handleInputChange,
}: EditableFieldProps) => {
    const { register } = useFormContext()

    return (
        <div>
            <label>
                <strong>{label.toUpperCase()}</strong>
            </label>

            <InfoContainer>
                <TextField
                    variant="standard"
                    InputProps={{
                        disableUnderline: activeEditMode !== label,
                        readOnly: activeEditMode !== label,
                    }}
                    {...register(label, {
                        onBlur,
                    })}
                    onChange={(e) => handleInputChange?.(e.target.value)}
                    defaultValue={defaultValue}
                />

                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) =>
                            prevMode === label ? null : label
                        )
                    }
                />
            </InfoContainer>
        </div>
    )
}

export default EditableField
