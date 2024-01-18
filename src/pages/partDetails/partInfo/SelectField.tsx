import { Box, ClickAwayListener } from '@mui/material';
import { ComponentProps, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { CSSObjectWithLabel } from 'react-select';
import { Edit, LabelContainer } from './styles';
import { ItemFields } from './types';
import { PartInfoSchema } from './hooks';

type Options = {
    value: string;
    label: string;
};
type SelectProps = {
    placeholder?: string;
    id?: string;
    selectedType?: string;
    label: ItemFields;
    options: Options[];
    value?: string;
    onBlur: ComponentProps<'input'>['onBlur'];
};

export const SelectField = ({ label, onBlur, options, placeholder }: SelectProps) => {
    const { register, control } = useFormContext<PartInfoSchema>();
    const [isOpen, setIsOpen] = useState(false);

    const handleClickAway = () => {
        setIsOpen(false);
    };

    const handleEditClick = () => {
        setIsOpen(true);
    };
    const generateSelectedStyles = (value: string) => {
        return {
            control: (provided: CSSObjectWithLabel) => ({
                ...provided,
                width: '100%',
                maxWidth: '500px',
                height: '41px',
                backgroundColor: '#fff',
                borderRadius: 0,
                border: '0px',
                borderBottom: '1px solid #000',
            }),
            menu: (provided: CSSObjectWithLabel) => ({
                ...provided,
                width: '70%',
                maxWidth: '500px',
            }),
            option: (
                provided: CSSObjectWithLabel,
                state: { data: { value: string } }
            ): CSSObjectWithLabel => {
                const stateValue = state.data.value;
                return {
                    ...provided,
                    color: stateValue === value ? '#fff' : 'inherit',
                    background: stateValue === value ? '#007bff' : 'inherit',
                    cursor: stateValue === value ? 'default' : 'pointer',
                    ':hover': {
                        background: stateValue !== value ? '#73b3f7' : '#007bff',
                        color: '#fff',
                    },
                };
            },
        };
    };

    return (
        <div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{label.toUpperCase()}</strong>
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
                                field: { onChange, value },
                            } = controllerProps;
                            return (
                                <>
                                    {isOpen && (
                                        <Select
                                            {...register(label)}
                                            options={options}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            styles={generateSelectedStyles(
                                                typeof value !== 'string' ? value.id : value
                                            )}
                                            placeholder={placeholder}
                                        />
                                    )}

                                    {!isOpen && typeof value !== 'string' && <p>{value?.name}</p>}
                                    {!isOpen && typeof value === 'string' && <p>{value}</p>}
                                </>
                            );
                        }}
                    />
                </Box>
            </ClickAwayListener>
        </div>
    );
};
