import { useContext } from 'react'
import { FormProvider } from 'react-hook-form'
import { ActionFunctionArgs, redirect, useActionData } from 'react-router-dom'
import ProgressBar from '../../../components/progressBar/ProgressBar.tsx'
import UmAppContext from '../../../contexts/UmAppContext.tsx'
import apiService from '../../../services/api.ts'
import { InputsForm } from './InputsForm.tsx'

import { Button } from '../../../components/SubmitButton.tsx'
import { usePartsForm } from '../hooks/useAddPart.tsx'
import { FormContainer, PartForm } from '../styles.ts'
import { TypesOptions } from './TypesOptions.tsx'
import { StyledForm } from './styles.ts'
import { useAddItems } from '../../../services/hooks/useAddItem.tsx'
import { AddItem } from '../../../services/apiTypes.ts'
import { DevTool } from '@hookform/devtools'

type response = {
    error: string
}

// WIP
const AddPartForm = () => {
    const {
        methods,
        control,
        onSubmit,
        formState: { errors },
    } = usePartsForm()
    const { handleSubmit } = methods

    return (
        <>
            <FormProvider {...methods}>
                <FormContainer>
                    <StyledForm onSubmit={handleSubmit(onSubmit)} id="addPart">
                        <ProgressBar progressLevel={4} />

                        <TypesOptions />
                        <InputsForm />

                        <Button id="addPart" type="submit" form="addPart">
                            Finish
                        </Button>

                    </StyledForm>
                </FormContainer>
            </FormProvider>
        </>
    )
}

export default AddPartForm
