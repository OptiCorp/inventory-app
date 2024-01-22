import { Box, ClickAwayListener, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ComponentProps, useState } from 'react';
import { ItemFields } from './types';
import { Edit, ErrorP, InfoContainer, LabelContainer, TextBoxWrap } from './styles';
import { PartInfoSchema } from './hooks';

type EditableFieldProps<TMultiLine = boolean> = {
    label: ItemFields;
    onBlur: ComponentProps<'input'>['onBlur'];
} & (TMultiLine extends true
    ? {
          /** Specifies if typefield is multi line (Must define rows if isMultiLine is true) */
          isMultiLine: true;
          /** Number of rows to display when multiline option is set to true. */
          rows: number;
      }
    : { isMultiLine?: false; rows?: never });

const EditableField = ({ isMultiLine, label, onBlur, rows }: EditableFieldProps) => {
    const { register, control } = useFormContext<PartInfoSchema>();

    const [open, setOpen] = useState(false);

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
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    );
};

export default EditableField;
