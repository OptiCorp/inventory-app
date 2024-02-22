import { FieldValues, Path, useController, useFormContext } from 'react-hook-form';
import { StyledIconContainer, StyledTextField } from './AddItemFormFields/styles';
import { ToolTip } from './ToolTip/ToolTip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Autocomplete } from '@mui/material';
import { useEffect } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { ErrorP } from '../pages/admin/styles';

type AutocompleteSelectProps<T extends FieldValues, K extends Path<T>> = {
    name: K;
    label: string;
    fieldLabel?: string;
    providedOptions: { id: T[K]; name: string }[];
    toolTip: string;
};
export const AutocompleteSelect = <T extends FieldValues, K extends Path<T>>({
    name,
    label,
    providedOptions,
    toolTip,
    fieldLabel,
}: AutocompleteSelectProps<T, K>) => {
    const { control, setValue } = useFormContext<T>();
    const {
        field: { onChange, value },
    } = useController({
        name: name,
        control,
    });

    const options = providedOptions?.map(({ id, name }) => ({
        value: id,
        label: name,
    }));

    const selectedValue = providedOptions?.find(({ id }) => id === value);

    useEffect(() => {
        if (selectedValue) {
            setValue(name, selectedValue.id);
        }
    }, [selectedValue]);
    const initialValue = selectedValue
        ? { value: selectedValue.id, label: selectedValue.name ?? '' }
        : null;

    return (
        <>
            <StyledIconContainer>
                <label htmlFor="category">{label}</label>
                {toolTip && (
                    <ToolTip content={toolTip}>
                        <HelpOutlineIcon fontSize="small" />
                    </ToolTip>
                )}
                <ErrorMessage name={name} render={({ message }) => <ErrorP>{message}</ErrorP>} />
            </StyledIconContainer>
            <Autocomplete
                options={options}
                fullWidth
                isOptionEqualToValue={(option, value) => option.value === value.value}
                size="small"
                value={initialValue ?? null}
                renderInput={(params) => {
                    return (
                        <StyledTextField
                            {...params}
                            /* InputProps={{
                            sx: {
                                borderRadius: '0',
                            },
                        }} */
                            label={fieldLabel}
                            variant="outlined"
                        />
                    );
                }}
                onChange={(_event, element) => onChange(element ? element?.value : null)}
            />
        </>
    );
};
