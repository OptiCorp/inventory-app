import { FormProvider } from 'react-hook-form'
import {
    AdminInput,
    ButtonContainer,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '../../../components/Button/SubmitButton'
import { COLORS } from '../../../style/GlobalStyles'
import { useAddVendorForm } from '../hooks/useAddVendorForm'

const AddVendor = () => {
    const { methods, onSubmit, register } = useAddVendorForm()
    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm onSubmit={onSubmit} id="addVendor">
                    <InputWrap>
                        <label htmlFor="vendorName">Vendor name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <SubmitButtonContainer>
                            <Button
                                id="addVendor"
                                type="submit"
                                backgroundColor={COLORS.primary}
                                color={COLORS.secondary}
                            >
                                Add vendor
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    )
}

export default AddVendor
