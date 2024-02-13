import { FormProvider } from 'react-hook-form';
import { useAddTemplateForm } from '../hooks/useAddTemplateForm';
import { AdminInput, FormContainer, InputWrap, StyledForm, SubmitButtonContainer } from '../styles';
import { Button, MenuItem, Select } from '@mui/material';
import { FormOption } from '../../../services/apiTypes';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';

export const AddTemplate = () => {
    const { methods, onSubmit, register } = useAddTemplateForm();
    const { data: categories } = useGetCategories();

    const options: FormOption[] = [
        { value: 'unit', label: 'Unit' },
        { value: 'assembly', label: 'Assembly' },
        { value: 'subassembly', label: 'Subassembly' },
        { value: 'part', label: 'Part' },
    ];

    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit(event).catch((error) => {
                            console.error('An error occurred:', error);
                        });
                    }}
                    id="addTemplate"
                >
                    <InputWrap>
                        <label>Type</label>
                        <Select sx={{ borderRadius: '0', minWidth: '143px' }} {...register('type')}>
                            {options.map((opt, index) => (
                                <MenuItem key={index} value={opt.value}>
                                    {opt.label}
                                </MenuItem>
                            ))}
                        </Select>
                        <label>Category</label>

                        <Select
                            sx={{ borderRadius: '0', minWidth: '143px' }}
                            {...register('categoryId')}
                        >
                            {categories?.map((category, index) => {
                                return (
                                    <MenuItem key={index} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                        <label>Product number</label>
                        <AdminInput type="text" {...register('productNumber')} />
                        <label>Description</label>
                        <AdminInput type="text" {...register('description')} />
                        <label>Revision</label>
                        <AdminInput type="text" {...register('revision')} />
                    </InputWrap>

                    <SubmitButtonContainer>
                        <Button type="submit" variant="contained">
                            Add template
                        </Button>
                    </SubmitButtonContainer>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};
