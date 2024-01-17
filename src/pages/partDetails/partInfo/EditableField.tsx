import { Box, ClickAwayListener, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ComponentProps, useState } from 'react';
import { ItemFields, Types } from './types';
import { Edit, ErrorP, InfoContainer, LabelContainer, TextBoxWrap } from './styles';
import { PartInfoSchema } from './hooks/useUpdatePartForm';
type EditableFieldProps<TMultiLine = boolean> = TMultiLine extends true
    ? {
          label: ItemFields;
          onBlur: ComponentProps<'input'>['onBlur'];
          options?: Types[];
          selectedType?: string;
          rows: number;
          isMultiLine: TMultiLine;
      }
    : {
          label: ItemFields;
          onBlur: ComponentProps<'input'>['onBlur'];
          options?: Types[];
          selectedType?: string;
          rows?: number;
          isMultiLine: TMultiLine;
      };

const EditableField = ({ isMultiLine, label, onBlur, rows }: EditableFieldProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<PartInfoSchema>();

    const [open, setOpen] = useState(false);

    const fieldErrorMessage = errors[label]?.message as string;

    const handleClickAway = () => {
        setOpen(false);
    };
    const handleEditClick = () => {
        setOpen(true);
    };

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
                                handleEditClick();
                            }}
                        />
                    </LabelContainer>
                    <Controller
                        control={control}
                        name={label}
                        render={(controllerProps) => {
                            const {
                                field: { onChange, value, name },
                            } = controllerProps;
                            const isEmpty = value === undefined || value === null || value === '';

                            return (
                                <>
                                    <InfoContainer>
                                        <TextField
                                            {...register(label)}
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: !open,
                                                readOnly: !open,
                                            }}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            multiline={isMultiLine}
                                            fullWidth
                                            rows={rows}
                                        />
                                    </InfoContainer>
                                    {isEmpty && (
                                        <ErrorP>{name.toLowerCase()} can not be empty.</ErrorP>
                                    )}
                                </>
                            );
                        }}
                    />

                    {fieldErrorMessage && <ErrorP>{fieldErrorMessage}</ErrorP>}
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    );
};

export default EditableField;
