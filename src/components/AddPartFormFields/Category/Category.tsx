import { ErrorMessage } from '@hookform/error-message'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa'
import {
    Category as CategoryType,
    FormOption,
} from '../../../services/apiTypes.ts'
import { useGetCategories } from '../../../services/hooks/categoryFix/useGetCategories.tsx'
import { ToolTip } from '../../ToolTip/ToolTip.tsx'
import { FormSelect } from '../FormSelect/FormSelect.tsx'
import { ErrorP, IconContainer, InputWrap, StyledDiv } from './styles.ts'

export const Category = () => {
    const { setValue } = useFormContext()

    const [selectedOption, setSelectedOption] = useState<FormOption | null>(
        null
    )
    const { data: categories = [] } = useGetCategories()

    const categoryOptions = categories.map((category: CategoryType) => ({
        value: category.id,
        label: category.name,
    }))

    useEffect(() => {
        setValue('categoryId', selectedOption?.value || '')
    }, [selectedOption, setValue])

    return (
        <StyledDiv>
            <InputWrap>
                <IconContainer>
                    <label htmlFor="category">Choose a category</label>{' '}
                    <ToolTip content="Specify a category">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </IconContainer>
                <ErrorMessage
                    name="categoryId"
                    render={({ message }) => <ErrorP>{message}</ErrorP>}
                />
            </InputWrap>
            <FormSelect
                options={categoryOptions}
                setState={setSelectedOption}
                state={selectedOption}
            ></FormSelect>
        </StyledDiv>
    )
}
