import { FormProvider } from 'react-hook-form';
import { useAddTemplateForm } from '../hooks/useAddTemplateForm';
import {
    InputWrap,
    StyledTemplateForm,
    SubmitButtonContainer,
    TemplateFormContainer,
} from '../styles';
import { Button } from '@mui/material';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { FormInput } from '../../../components/FormInput';
import { AutocompleteSelect } from '../../../components/AutocompleteSelect';
import { useFieldNameController } from '../../../hooks/useFieldNameController';

export const AddTemplate = () => {
    const { methods, onSubmit, control } = useAddTemplateForm();
    const { onChange: productNumberOnChange } = useFieldNameController('productNumber', control);
    const { onChange: revisionOnChange } = useFieldNameController('revision', control);
    const { onChange: descriptionOnChange } = useFieldNameController('description', control);

    const { data: categories } = useGetCategories();

    const options = [
        { id: 'unit', name: 'Unit' },
        { id: 'assembly', name: 'Assembly' },
        { id: 'subassembly', name: 'Subassembly' },
        { id: 'part', name: 'Part' },
    ];

    return (
        <FormProvider {...methods}>
            <StyledTemplateForm
                onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit(event).catch((error) => {
                        console.error('An error occurred:', error);
                    });
                }}
                id="addTemplate"
            >
                <TemplateFormContainer>
                    <InputWrap>
                        <AutocompleteSelect
                            name="type"
                            label="Choose a type"
                            providedOptions={options}
                            toolTip="Specify a type"
                            fieldLabel="Types"
                        />
                        <AutocompleteSelect
                            name="categoryId"
                            label="Choose a category"
                            providedOptions={categories as { id: string; name: string }[]}
                            toolTip="Specify a category"
                            fieldLabel="Categories"
                        />

                        <FormInput
                            label="Product number"
                            toolTip="Specify a product number"
                            placeholder="E.g BV 113 EU"
                            name="productNumber"
                            onChange={productNumberOnChange}
                        />
                        <FormInput
                            label="Revision"
                            name="revision"
                            toolTip="Specify a revision number"
                            placeholder="E.g 1.06"
                            onChange={revisionOnChange}
                        />
                        <FormInput
                            label="Description"
                            name="description"
                            placeholder="Description"
                            isMultiLine
                            onChange={descriptionOnChange}
                            rows={4}
                        />
                    </InputWrap>
                </TemplateFormContainer>
                <SubmitButtonContainer>
                    <Button type="submit" variant="contained">
                        Add template
                    </Button>
                </SubmitButtonContainer>
            </StyledTemplateForm>
        </FormProvider>
    );
};
