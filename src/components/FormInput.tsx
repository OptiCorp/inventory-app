import { FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { ComponentProps } from 'react';
import { ToolTip } from './ToolTip/ToolTip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { StyledIconContainer, StyledInputWrap } from './AddItemFormFields/styles';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorP } from '../pages/itemDetails/itemInfo/styles'; /*

type FormInputProps<TMultiLine = boolean> = {
    label: string;
    id: string;
    toolTip?: string;
    placeholder?: ComponentProps<'input'>['placeholder'];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    ref?: React.Ref<HTMLInputElement>;
    name?: string;
    disabled?: boolean;
    isMultiLine?: TMultiLine extends true ? true : never;
    rows?: TMultiLine extends true ? number : never;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, id, toolTip, placeholder, isMultiLine, rows, ...props }, ref) => (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor={id}>{label}</label>
                    {toolTip && (
                        <ToolTip content={toolTip}>
                            <HelpOutlineIcon fontSize="small" />
                        </ToolTip>
                    )}
                </StyledIconContainer>
            </StyledInputWrap>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                    placeholder={placeholder}
                    multiline={isMultiLine}
                    rows={rows}
                    id={id}
                    variant="filled"
                    ref={ref}
                    {...props}
                    fullWidth
                />
                <ErrorMessage name={id} render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </div>
        </StyledDiv>
    )
);

FormInput.displayName = 'FormInput';
 */
type FormInputProps<T extends FieldValues, K extends Path<T>, TMultiLine = boolean> = {
    label: string;
    toolTip?: string;
    placeholder?: ComponentProps<'input'>['placeholder'];
    name: K;
    isMultiLine?: TMultiLine extends true ? true : never;
    rows?: TMultiLine extends true ? number : never;
};
export const FormInput = <T extends FieldValues, K extends Path<T>>({
    name,
    label,
    toolTip,
    isMultiLine,
    rows,
    placeholder,
}: FormInputProps<T, K>) => {
    const { control } = useFormContext<T>();
    const {
        field: { onChange, value },
    } = useController({
        name: name,
        control,
    });
    return (
        <>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor={name}>{label}</label>
                    {toolTip && (
                        <ToolTip content={toolTip}>
                            <HelpOutlineIcon fontSize="small" />
                        </ToolTip>
                    )}
                    <ErrorMessage
                        name={name}
                        render={({ message }) => <ErrorP>{message}</ErrorP>}
                    />
                </StyledIconContainer>
            </StyledInputWrap>

            <TextField
                value={value}
                variant="filled"
                fullWidth
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
