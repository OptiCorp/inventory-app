import { ErrorMessage } from '@hookform/error-message';
import { FormProvider } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { useAddVendorForm } from '../hooks/useAddVendorForm';
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles';

export const AddVendor = () => {
    const { methods, onSubmit, register } = useAddVendorForm();
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
                    id="addVendor"
                >
                    <InputWrap>
                        <label htmlFor="vendorName">Vendor name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <SubmitButtonContainer>
                            <Button id="addVendor" type="submit" variant="black">
                                Add vendor
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};
