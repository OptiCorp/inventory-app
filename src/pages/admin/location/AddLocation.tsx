import { ErrorMessage } from '@hookform/error-message';
import { FormProvider } from 'react-hook-form';
import { Button } from '../../../components/Button/Button';
import { useAddLocationForm } from '../hooks/useAddLocationForm';
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles';

export const AddLocation = () => {
    const { methods, onSubmit, register } = useAddLocationForm();
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
                    id="addLocation"
                >
                    <InputWrap>
                        <label htmlFor="locationName">Location name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <SubmitButtonContainer>
                            <Button id="addLocation" type="submit" variant="black">
                                Add location
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};
