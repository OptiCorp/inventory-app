import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { StyledForm } from './addItemForm/styles';
import { ItemSchema } from './hooks/itemValidator';
import { useAddItemForm } from './hooks/useAddItemForm';
import { ButtonWrapper } from './styles';

type stepsSchema = keyof ItemSchema;

const steps: { fields: stepsSchema[]; slug: string }[] = [
    {
        fields: ['isBatch'],
        slug: 'batch',
    },
    {
        fields: ['preCheck'],
        slug: 'checks',
    },
    {
        fields: ['documentation'],
        slug: 'upload',
    },
    {
        fields: ['itemTemplate'],
        slug: 'template',
    },
    {
        fields: ['serialNumber', 'wpId', 'vendorId'],
        slug: 'add-form',
    },
];

const AddItem = () => {
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
            if (!location.pathname.includes(`${step.slug}`)) {
                setActiveStep(0);
            } else if (location.pathname === '/add-item/') {
                setActiveStep(0);
            }
        });
    }, [!location.pathname.includes('/add-item/')]);

    useEffect(() => {
        const currentStep = steps.findIndex((step) => location.pathname.includes(`${step.slug}`));
        setActiveStep(currentStep !== -1 ? currentStep : 0);
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

export default AddItem;
