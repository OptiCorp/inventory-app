import { FormProvider } from 'react-hook-form'
import { useAddCategoryForm } from '../hooks/useAddCategoryForm'
import { Button } from '../../../components/Button/SubmitButton'
import { COLORS } from '../../../style/GlobalStyles'
import {
    AdminInput,
    ButtonContainer,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
} from '../styles'
import { ErrorMessage } from '@hookform/error-message'

const AddCategory = () => {
    const { methods, onSubmit, register } = useAddCategoryForm()
    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm onSubmit={onSubmit} id="addCategory">
                    <InputWrap>
                        <label htmlFor="categoryName">Category name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <ButtonContainer>
                            <Button
                                id="addCategory"
                                type="submit"
                                backgroundColor={COLORS.primary}
                                color={COLORS.secondary}
                            >
                                Add category
                            </Button>
                        </ButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    )
}

export default AddCategory
