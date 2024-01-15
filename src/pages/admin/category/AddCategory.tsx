/* eslint-disable @typescript-eslint/no-misused-promises */
import { ErrorMessage } from '@hookform/error-message'
import { FormProvider } from 'react-hook-form'
import { Button } from '../../../components/Button/SubmitButton'
import { COLORS } from '../../../style/GlobalStyles'
import { useAddCategoryForm } from '../hooks/useAddCategoryForm'
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer
} from '../styles'

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
                        <SubmitButtonContainer>
                            <Button
                                id="addCategory"
                                type="submit"
                                backgroundColor={COLORS.primary}
                                color={COLORS.secondary}
                            >
                                Add category
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    )
}

export default AddCategory
