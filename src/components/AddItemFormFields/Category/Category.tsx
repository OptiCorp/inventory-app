import { useController, useFormContext } from 'react-hook-form';
import { FaRegQuestionCircle as FaRegQuestionCircleIcon } from 'react-icons/fa';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories.tsx';
import { ToolTip } from '../../ToolTip/ToolTip.tsx';

import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator.ts';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles.ts';

export const Category = () => {
    const { control, watch, setValue } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
    } = useController({
        name: 'itemTemplate.categoryId',

        control,
    });
    const selectedTemplate = watch('itemTemplate.id');
    const { data: categories = [] } = useGetCategories();
    const selectedCategory = categories.find((option) => option.id === value);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    useEffect(() => {
        if (selectedCategory) {
            setValue('itemTemplate.categoryId', selectedCategory?.id);
        }
    }, [selectedCategory]);

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="category">Choose a category</label>{' '}
                    <ToolTip content="Specify a category">
                        <FaRegQuestionCircleIcon />
                    </ToolTip>
                </StyledIconContainer>
                <ErrorMessage
                    name="itemTemplate.categoryId"
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledInputWrap>
            <Autocomplete
                options={categoryOptions}
                disabled={!!selectedTemplate}
                size="small"
                sx={{ width: '100%' }}
                value={{ value: selectedCategory?.id, label: selectedCategory?.name ?? '' }}
                renderInput={(params) => (
                    <TextField {...params} label="Categories" variant="outlined" />
                )}
                onChange={(_event, category) => onChange(category ? category?.value : null)}
            />
        </StyledDiv>
    );
};
