/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { StyledForm } from './addPartForm/styles';
import { PartSchema } from './hooks/partValidator';
import { useAddPartForm } from './hooks/useAddPartForm';

type stepsSchema = keyof PartSchema;

const steps: { fields: stepsSchema[]; slug: string }[] = [
    {
        fields: ['isBatch'],
        slug: 'batch',
    },
    {
        fields: ['isChecked'],
        slug: 'checks',
    },
    {
        fields: ['documentation'],
        slug: 'upload',
    },
    {
        fields: ['templateData'],
        slug: 'template',
    },
    {
        fields: ['serialNumber'],
        slug: 'add-form',
    },
];

const AddPart = () => {
    const { methods, onSubmit, trigger } = useAddPartForm();

    const navigate = useNavigate();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        if (steps[activeStep].slug === 'template') {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            navigate(`/add-part/${steps[activeStep + 1].slug}`);
        }
        const isValid = await trigger(steps[activeStep].fields);
        if (!isValid) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        navigate(`/add-part/${steps[activeStep + 1].slug}`);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        navigate(`/add-part/${steps[activeStep - 1].slug}`);
    };

    return (
        <FormProvider {...methods}>
            {steps.some((step) => location.pathname.includes(`/add-part/${step.slug}`)) && (
                <ProgressBar
                    activeStep={activeStep}
                    handleNext={handleNext}
                    handleBack={handleBack}
                />
            )}
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
