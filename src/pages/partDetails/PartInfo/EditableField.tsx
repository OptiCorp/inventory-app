import { TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, InfoContainer, LabelContainer, TextBoxWrap } from './styles'
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

    const fieldErrorMessage = errors[label]?.message as string
    return (
        <TextBoxWrap>
            <LabelContainer>
                <label>
                    <strong>
                        {label
                            .split(/(?=[A-Z])/)
                            .join(' ')
                            .toUpperCase()}
                    </strong>
                </label>
                <Edit
                    onClick={() =>
                        setActiveEditMode((prevMode) => (prevMode === label ? null : label))
                    }
                />
            </LabelContainer>
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
                        handleInputChange?.(e.target.value)
                    }}
                    defaultValue={defaultValue}
                />
            </InfoContainer>

            {fieldErrorMessage && <p style={{ color: 'red' }}>{fieldErrorMessage}</p>}
        </TextBoxWrap>
    )
}

export default EditableField
