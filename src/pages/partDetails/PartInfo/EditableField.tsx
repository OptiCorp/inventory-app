import { Box, ClickAwayListener, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, InfoContainer, LabelContainer, TextBoxWrap } from './styles'
import { EditableFieldProps } from './types'
import { useState } from 'react'

const EditableField = ({ label, defaultValue, onBlur, handleInputChange }: EditableFieldProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()
    const [open, setOpen] = useState(false)

    const fieldErrorMessage = errors[label]?.message as string
    const handleClickAway = () => {
        setOpen(false)
    }
    const handleEditClick = () => {
        setOpen(true)
    }
    return (
        <TextBoxWrap>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
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
                            onClick={() => {
                                handleEditClick()
                            }}
                        />
                    </LabelContainer>
                    <InfoContainer>
                        <TextField
                            variant="standard"
                            InputProps={{
                                disableUnderline: !open,
                                readOnly: !open,
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
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    )
}

export default EditableField
