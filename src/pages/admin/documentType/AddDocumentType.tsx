import { FormProvider } from 'react-hook-form';
import { useAddDocumentTypeForm } from '../hooks/useAddDocumentTypeForm';
import {
    AdminInput,
    ErrorP,
    FormContainer,
    InputWrap,
    StyledForm,
    SubmitButtonContainer,
} from '../styles';
import { ErrorMessage } from '@hookform/error-message';
import { Button } from '@mui/material';

export const AddDocumentType = () => {
    const { methods, onSubmit, register } = useAddDocumentTypeForm();
    return (
        <FormProvider {...methods}>
            <FormContainer>
                <StyledForm
                    onSubmit={(event) => {
                        event && event.preventDefault();
                        onSubmit(event).catch((error) => {
                            console.error('An error occurred:', error);
                        });
                    }}
                    id="addDocumentType"
                >
                    <InputWrap>
                        <label htmlFor="documentTypeName">Document type name</label>
                        <AdminInput type="text" id="documentTypeName" {...register('name')} />
                        <ErrorMessage
                            name="name"
                            render={({ message }) => <ErrorP>{message}</ErrorP>}
                        />
                        <label htmlFor="documentTypeDescription">Document type description</label>
                        <AdminInput
                            type="text"
                            id="documentTypeDescription"
                            {...register('description')}
                        />
                        <SubmitButtonContainer>
                            <Button id="addDocumentType" type="submit" variant="contained">
                                Add document type
                            </Button>
                        </SubmitButtonContainer>
                    </InputWrap>
                </StyledForm>
            </FormContainer>
        </FormProvider>
    );
};
