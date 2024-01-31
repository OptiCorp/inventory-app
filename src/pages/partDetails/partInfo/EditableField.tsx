import { Box, ClickAwayListener } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { ChangeEvent, ComponentProps, useState } from 'react';
import { FieldNames } from './types';
import {
    Edit,
    ErrorP,
    InfoContainer,
    LabelContainer,
    StyledTextField,
    TextBoxWrap,
} from './styles';
import { PartInfoSchema } from './hooks';

type EditableFieldProps<TMultiLine = boolean> = {
    fieldName: FieldNames;
    label: keyof PartInfoSchema;
    onBlur: ComponentProps<'input'>['onBlur'];
    onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    value?: string;
    isUnique?: boolean;
    loading?: boolean;
} & (TMultiLine extends true
    ? {
          /** Specifies if typefield is multi line (Must define rows if isMultiLine is true) */
          isMultiLine: true;
          /** Number of rows to display when multiline option is set to true. */
          rows: number;
      }
    : { isMultiLine?: false; rows?: never });

const EditableField = ({
    isMultiLine,
    label,
    onBlur,
    onChange,
    rows,
    fieldName,
    value: parentValue,
    isUnique,
    loading,
}: EditableFieldProps) => {
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
                            <strong>{fieldName}</strong>
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
                                field: {
                                    onChange: controllerOnChange,
                                    value: controllerValue,
                                    name,
                                },
                            } = controllerProps;
                            const fieldOnChange = onChange ?? controllerOnChange;
                            const value = parentValue ?? controllerValue;
                            const isEmpty = value === undefined || value === null || value === '';

                            return (
                                <>
                                    <InfoContainer>
                                        <StyledTextField
                                            {...register(label)}
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: !open,
                                                readOnly: !open,
                                            }}
                                            onBlur={onBlur}
                                            onChange={fieldOnChange}
                                            multiline={isMultiLine}
                                            fullWidth
                                            rows={rows}
                                        />
                                    </InfoContainer>
                                    {loading && <p>Checking...</p>}
                                    {isEmpty && (
                                        <ErrorP>{name.toLowerCase()} can not be empty.</ErrorP>
                                    )}
                                    {isUnique === false && (
                                        <ErrorP>{name.toLowerCase()} must be unique</ErrorP>
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
