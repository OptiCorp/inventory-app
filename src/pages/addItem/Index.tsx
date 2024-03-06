import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { steps } from '../../components/ProgressBar/Steps';
import { StyledForm } from './addItemForm/styles';
import { useAddItemForm } from './hooks/useAddItemForm';
import { ButtonWrapper } from './styles';

export const AddItem = () => {
    const { methods, onSubmit, trigger, reset } = useAddItemForm();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async () => {
        if (steps[activeStep].slug === 'template') {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            navigate(`/add-item/${steps[activeStep + 1].slug}`);
        }
        const isValid = await trigger(steps[activeStep].fields);
        if (!isValid) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        navigate(`/add-item/${steps[activeStep + 1].slug}`);
    };

    useEffect(() => {
        steps.some((step) => {
            if (!location.pathname.includes(`${step.slug}`) || location.pathname === '/add-item/') {
                setActiveStep(0);
                reset();
            }
        });
    }, [!location.pathname.includes('/add-item/')]);

    useEffect(() => {
        if (location.pathname === '/add-item/') {
            setActiveStep(0);
            reset();
        }
    }, [location.pathname]);

    useEffect(() => {
        const currentStep = steps.findIndex((step) => location.pathname.includes(`${step.slug}`));
        setActiveStep(currentStep !== -1 ? currentStep : 0);
        if (activeStep === 0) {
            reset();
        }
    }, [location.pathname]);

    useEffect(() => {
        const entries = performance.getEntriesByType('navigation');
        if (entries && entries.length > 0 && 'type' in entries[0]) {
            const navigationEntry: PerformanceNavigationTiming =
                entries[0] as PerformanceNavigationTiming;
            if (navigationEntry.type === 'reload') {
                reset();
                setActiveStep(0);
                navigate(`/add-item/`);
            }
        }
    }, []);

    useEffect(() => {
        window.onbeforeunload = () => true;

        return () => {
            window.onbeforeunload = null;
        };
    }, []);
    return (
        <FormProvider {...methods}>
            {steps.some((step) => location.pathname.includes(`/add-item/${step.slug}`)) && (
                <ProgressBar activeStep={activeStep} steps={steps} />
            )}

            <StyledForm onSubmit={onSubmit} id="addItem">
                <Outlet />
            </StyledForm>
            {location.pathname === `/add-item` ||
            location.pathname === '/add-item/add-form' ? null : (
                <ButtonWrapper>
                    <Button
                        variant="contained"
                        onClick={() => {
                            void handleNext();
                        }}
                    >
                        NEXT
                    </Button>
                </ButtonWrapper>
            )}
        </FormProvider>
    );
};
