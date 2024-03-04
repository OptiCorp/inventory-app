import { Box, ClickAwayListener } from '@mui/material';
import { ComponentProps, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { CSSObjectWithLabel } from 'react-select';
import { useGetItemsInfinite } from '../../../services/hooks/items/useGetItemsInfinite';
import { ItemInfoSchema } from './hooks';
import { Edit, LabelContainer } from './styles';
import { FieldNames, ItemFields } from './types';

type Options = {
    value: string;
    label: string;
};
type SelectProps = {
    placeholder?: string;
    id?: string;
    selectedType?: string;
    label: ItemFields;
    fieldName: FieldNames;
    options: Options[];
    value?: string | { value: string };
    onBlur?: ComponentProps<'input'>['onBlur'];
};

export const SelectField = ({ label, onBlur, options, placeholder, fieldName }: SelectProps) => {
    const { register, control } = useFormContext<ItemInfoSchema>();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const { isLoading, fetchNextPage } = useGetItemsInfinite(searchTerm);

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
                                            onInputChange={(value) => setSearchTerm(value)}
                                            onMenuScrollToBottom={() => {
                                                fetchNextPage().catch((error) => {
                                                    console.error('An error occurred:', error);
                                                });
                                            }}
                                            isLoading={isLoading}
                                            styles={generateSelectedStyles(
                                                typeof value !== 'string' ? value?.id : value
                                            )}
                                            placeholder={placeholder}
                                        />
                                    )}

                                    {!isOpen && typeof value !== 'string' && (
                                        <p>{value?.name ?? value?.label}</p>
                                    )}
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
