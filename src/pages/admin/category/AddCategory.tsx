import { ErrorMessage } from '@hookform/error-message';
import { FormProvider } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { COLORS } from '../../../style/GlobalStyles';
import { useAddCategoryForm } from '../hooks/useAddCategoryForm';
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles';

const AddCategory = () => {
    const { methods, onSubmit, register } = useAddCategoryForm();
    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm
                    onSubmit={(e) => {
                        e && e.preventDefault(); // Prevent the default form submission behavior
                        onSubmit(e).catch((error) => {
                            console.error('An error occurred:', error);
                        });
                    }}
                    id="addCategory"
                >
                    <InputWrap>
                        <label htmlFor="categoryName">Category name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <SubmitButtonContainer>
                            <Button
                                id="addCategory"
                                type="submit"
                                backgroundColor={COLORS.black}
                                color={COLORS.white}
                            >
                                Add category
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};

export default AddCategory;
