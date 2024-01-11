import { Box, ClickAwayListener } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { Edit, LabelContainer, TextBoxWrap } from './styles'
import { TypeProps } from './types'
import { useState } from 'react'
import Select, { CSSObjectWithLabel } from 'react-select'

export const TypeField = ({
    handleSelectChange,
    label,
    defaultValue,
    onBlur,
    options,
}: TypeProps) => {
    const { register } = useFormContext()
    const [isOpen, setIsOpen] = useState(false)

    const handleClickAway = () => {
        setIsOpen(false)
    }
    const handleEditClick = () => {
        setIsOpen(true)
    }

    const newOptions = options.map((option) => ({
        value: option.id,
        label: option.name,
    }))

    const customStyles = {
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
            const stateValue = state.data.value
            return {
                ...provided,
                color: stateValue === defaultValue ? 'gray' : 'inherit',
                cursor: stateValue === defaultValue ? 'not-allowed' : 'pointer',
            }
        },
    }

    return (
        <TextBoxWrap>
            <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                    <LabelContainer>
                        <label>
                            <strong>{label.toUpperCase()}</strong>
                        </label>
                        <Edit
                            onClick={() => {
                                handleEditClick()
                            }}
                        />
                    </LabelContainer>
                    {isOpen && (
                        <Select
                            {...register(label.toLowerCase())}
                            options={newOptions}
                            onChange={handleSelectChange}
                            onBlur={onBlur}
                            styles={customStyles}
                        />
                    )}
                    {!isOpen && (
                        <p>{newOptions.find((option) => option.value === defaultValue)?.label}</p>
                    )}
                </Box>
            </ClickAwayListener>
        </TextBoxWrap>
    )
}
