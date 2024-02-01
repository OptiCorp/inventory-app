import { FormProvider } from 'react-hook-form';
import { Outlet } from 'react-router-dom';
import { StyledForm } from './addPartForm/styles';
import { useAddPartForm } from './hooks/useAddPartForm';

const AddPart = () => {
    const { methods, onSubmit } = useAddPartForm();
    return (
        <FormProvider {...methods}>
            <StyledForm
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit().catch((error) => {
                        console.log('Unable to add part', error);
                    });
                }}
                id="addPart"
            >
                <Outlet />
            </StyledForm>
        </FormProvider>
    );
};

export default AddPart;
