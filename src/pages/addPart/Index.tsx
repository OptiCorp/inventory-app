import { FormProvider } from 'react-hook-form'
import { Outlet } from 'react-router-dom'
import { StyledForm } from './addPartForm/styles'
import { useAddPartForm } from './hooks/useAddPartForm'

const AddPart = () => {
    const { methods, onSubmit, formState, control } = useAddPartForm()
    return (
        <FormProvider {...methods}>
            <StyledForm onSubmit={onSubmit} id="addPart">
                <Outlet />
            </StyledForm>
        </FormProvider>
    )
}

export default AddPart
