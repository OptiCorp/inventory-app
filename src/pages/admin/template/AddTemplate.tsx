import { FormProvider } from 'react-hook-form';
import { useAddTemplateForm } from '../hooks/useAddTemplateForm';
import { InputWrap, SubmitButtonContainer, TemplateFormContainer } from '../styles';
import { Button } from '@mui/material';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { FormInput } from '../../../components/FormInput';
import { AutocompleteSelect } from '../../../components/AutocompleteSelect';

export const AddTemplate = () => {
    const {
        methods,
        onSubmit,
        formState: { errors },
    } = useAddTemplateForm();

    const { data: categories } = useGetCategories();

    /* const options: FormOption[] = [
        { value: 'unit', label: 'Unit' },
        { value: 'assembly', label: 'Assembly' },
        { value: 'subassembly', label: 'Subassembly' },
        { value: 'part', label: 'Part' },
    ]; */

    const options = [
        { id: 'unit', name: 'Unit' },
        { id: 'assembly', name: 'Assembly' },
        { id: 'subassembly', name: 'Subassembly' },
        { id: 'part', name: 'Part' },
    ];

    console.log(errors);
    return (
        <FormProvider {...methods}>
            <TemplateFormContainer>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit(event).catch((error) => {
                            console.error('An error occurred:', error);
                        });
                    }}
                    id="addTemplate"
                >
                    <InputWrap>
                        <AutocompleteSelect
                            name="type"
                            label="Choose a type"
                            providedOptions={options}
                            toolTip="Specify a type"
                        />
                        <AutocompleteSelect
                            name="categoryId"
                            label="Choose a category"
                            providedOptions={categories as { id: string; name: string }[]}
                            toolTip="Specify a category"
                        />

                        <FormInput
                            label="Product number"
                            toolTip="Specify a product number"
                            placeholder="E.g BV 113 EU"
                            name="productNumber"
                        />
                        <FormInput
                            label="Revision"
                            name="revision"
                            toolTip="Specify a revision number"
                            placeholder="E.g 1.06"
                        />
                        <FormInput
                            label="Description"
                            name="description"
                            placeholder="Description"
                            isMultiLine
                            rows={4}
                        />
                    </InputWrap>

                    <SubmitButtonContainer>
                        <Button type="submit" variant="contained">
                            Add template
                        </Button>
                    </SubmitButtonContainer>
                </form>
            </TemplateFormContainer>
        </FormProvider>
    );
};
