/* eslint-disable @typescript-eslint/no-misused-promises */
import { ErrorMessage } from '@hookform/error-message';
import { FormProvider } from 'react-hook-form';
import { Button } from '../../../components/Button/SubmitButton';
import { COLORS } from '../../../style/GlobalStyles';
import { useAddLocationForm } from '../hooks/useAddLocationForm';
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles';

const AddLocation = () => {
    const { methods, onSubmit, register } = useAddLocationForm();
    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm onSubmit={onSubmit} id="addLocation">
                    <InputWrap>
                        <label htmlFor="locationName">Location name</label>
                        <AdminInput type="text" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <SubmitButtonContainer>
                            <Button
                                id="addLocation"
                                type="submit"
                                backgroundColor={COLORS.primary}
                                color={COLORS.secondary}
                            >
                                Add location
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};

export default AddLocation;
