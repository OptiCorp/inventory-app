import { TextField, TextFieldVariants } from '@mui/material';
import { ComponentProps } from 'react';
import { ToolTip } from './ToolTip/ToolTip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { StyledIconContainer, StyledInputWrap } from './AddItemFormFields/styles';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorP } from '../pages/itemDetails/itemInfo/styles';

type FormInputProps<TMultiLine = boolean> = {
    label?: string;
    toolTip?: string;
    placeholder?: ComponentProps<'input'>['placeholder'];
    name?: string;
    value?: string;
    isMultiLine?: TMultiLine extends true ? true : never;
    rows?: TMultiLine extends true ? number : never;
    onChange: ComponentProps<'input'>['onChange'];
    variant?: TextFieldVariants;
};
export const FormInput = ({
    name,
    label,
    toolTip,
    isMultiLine,
    rows,
    placeholder,
    value,
    onChange,
    variant,
}: FormInputProps) => {
    return (
        <>
            {label && (
                <StyledInputWrap>
                    <StyledIconContainer>
                        <label htmlFor={name}>{label}</label>
                        {toolTip && (
                            <ToolTip content={toolTip}>
                                <HelpOutlineIcon fontSize="small" />
                            </ToolTip>
                        )}
                        <ErrorMessage
                            name={name ?? ''}
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                    </StyledIconContainer>
                </StyledInputWrap>
            )}

            <TextField
                value={value}
                variant={variant}
                fullWidth
                sx={{
                    width: { sm: 400, md: 700 },
                }}
                size="small"
                onChange={onChange}
                multiline={isMultiLine}
                rows={rows}
                placeholder={placeholder}
                id={name}
                InputProps={{
                    sx: {
                        borderRadius: '0',
                    },
                }}
            />
        </>
    );
};
