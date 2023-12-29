import { FormProvider } from 'react-hook-form'
import { Outlet } from 'react-router-dom'
import { StyledForm } from './addPartForm/styles'
import { usePartsForm } from './hooks/useAddPartForm'

const AddPart = () => {
    const { methods, onSubmit, formState, control } = usePartsForm()
    return (
        <FormProvider {...methods}>
            <StyledForm onSubmit={onSubmit} id="addPart">
                <Outlet />
            </StyledForm>
        </FormProvider>
    )
}

export default AddPart
