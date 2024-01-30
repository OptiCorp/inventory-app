/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { StyledForm } from './addPartForm/styles';
import { PartSchema } from './hooks/partValidator';
import { useAddPartForm } from './hooks/useAddPartForm';
import { ButtonWrapper } from './styles';

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
        fields: ['serialNumber', 'categoryId', 'productNumber', 'type', 'wpId', 'vendorId'],
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

    useEffect(() => {
        steps.some((step) => {
            if (!location.pathname.includes(`/add-part/${step.slug}`)) {
                setActiveStep(0);
            } else if (location.pathname === '/add-part/') {
                setActiveStep(0);
            }
        });
    }, [!location.pathname.includes('/add-part/')]);

    return (
        <FormProvider {...methods}>
            {steps.some((step) => location.pathname.includes(`/add-part/${step.slug}`)) && (
                <ProgressBar activeStep={activeStep} steps={steps} />
            )}
            <StyledForm onSubmit={onSubmit} id="addPart">
                <Outlet />
            </StyledForm>
            {location.pathname === `/add-part` ||
            location.pathname === '/add-part/add-form' ? null : (
                <ButtonWrapper>
                    <Button variant="black" onClick={handleNext}>
                        NEXT
                    </Button>
                </ButtonWrapper>
            )}
        </FormProvider>
    );
};

export default AddPart;
