import { Box, ClickAwayListener } from '@mui/material';
import { ChangeEvent, ComponentProps, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { COLORS } from '../../../style/GlobalStyles';
import { ItemInfoSchema } from './hooks';
import {
    Edit,
    ErrorP,
    InfoContainer,
    LabelContainer,
    StyledTextField,
    TextBoxWrap,
} from './styles';
import { FieldNames } from './types';

type EditableFieldProps<TMultiLine = boolean> = {
    fieldName: FieldNames;
    label: keyof ItemInfoSchema;
    onBlur?: ComponentProps<'input'>['onBlur'];
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

export const EditableField = ({
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
    const { register, control } = useFormContext<ItemInfoSchema>();

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
                        {onBlur && (
                            <Edit
                                onClick={() => {
                                    handleEditClick();
                                }}
                            />
                        )}
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
                                                style: {
                                                    color:
                                                        isEmpty && !open ? COLORS.red : undefined,
                                                    fontWeight:
                                                        isEmpty && !open ? '600' : undefined,
                                                },
                                            }}
                                            onBlur={onBlur}
                                            onChange={fieldOnChange}
                                            multiline={isMultiLine}
                                            fullWidth
                                            value={
                                                isEmpty && !open
                                                    ? `${name
                                                          .replace('itemTemplate.', '')
                                                          .toLowerCase()} can not be empty`
                                                    : value
                                            }
                                            rows={rows}
                                        />
                                    </InfoContainer>
                                    {loading && <p>Checking...</p>}
                                    {/* {isEmpty && (
                                        <ErrorP>
                                            {name.replace('itemTemplate.', '').toLowerCase()} can
                                            not be empty.
                                        </ErrorP>
                                    )} */}
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
