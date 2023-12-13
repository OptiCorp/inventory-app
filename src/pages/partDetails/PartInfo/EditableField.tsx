import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, InfoContainer, TextBoxWrap } from './styles'
import { EditableFieldProps } from './types'

const EditableField = ({
    label,
    defaultValue,
    onBlur,
    activeEditMode,
    setActiveEditMode,
    handleInputChange,
}: EditableFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const fieldErrorMessage = errors[label]?.message
    return (
        <TextBoxWrap>
            <label>
                <strong>
                    {label
                        .split(/(?=[A-Z])/)
                        .join(' ')
                        .toUpperCase()}
                </strong>
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
                    onChange={(e) => {
                        console.log('target value: ', e.target.value)
                        handleInputChange?.(e.target.value)
                    }}
                    defaultValue={defaultValue}
                />

                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) => (prevMode === label ? null : label))
                    }
                />
            </InfoContainer>

            {fieldErrorMessage && <p style={{ color: 'red' }}>{fieldErrorMessage as string}</p>}
        </TextBoxWrap>
    )
}

export default EditableField
