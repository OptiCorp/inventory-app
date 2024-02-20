import { ErrorMessage } from '@hookform/error-message';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useController, useFormContext } from 'react-hook-form';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { Category as CategoryType } from '../../../services/apiTypes';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { ToolTip } from '../../ToolTip/ToolTip';
import { StyledDiv, StyledErrorP, StyledIconContainer, StyledInputWrap } from '../styles';

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

    const categoryOptions = categories.map((category: CategoryType) => ({
        value: category.id,
        label: category.name,
    }));

    const selectedCategory = categories.find((option) => option.id === value);

    useEffect(() => {
        if (selectedCategory) {
            setValue('itemTemplate.categoryId', selectedCategory?.id);
        }
    }, [selectedCategory]);

    const initialValue = selectedCategory
        ? { value: selectedCategory.id, label: selectedCategory.name ?? '' }
        : null;

    return (
        <StyledDiv>
            <StyledInputWrap>
                <StyledIconContainer>
                    <label htmlFor="category">Choose a category</label>
                    <ToolTip content="Specify a category">
                        <HelpOutlineIcon fontSize="small" />
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
                isOptionEqualToValue={(option, value) => option.value === value.value}
                size="small"
                sx={{ width: '100%' }}
                value={initialValue}
                renderInput={(params) => (
                    <TextField {...params} label="Categories" variant="outlined" />
                )}
                onChange={(_event, category) => onChange(category ? category?.value : null)}
            />
        </StyledDiv>
    );
};
