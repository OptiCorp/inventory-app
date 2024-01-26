/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { StyledForm } from './addPartForm/styles';
import { PartSchema } from './hooks/partValidator';
import { useAddPartForm } from './hooks/useAddPartForm';
import { ButtonWrapper } from './styles';

type test = keyof PartSchema;

const steps: { fields: test[]; slug: string }[] = [
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
];

const AddPart = () => {
    const { methods, onSubmit, trigger } = useAddPartForm();

    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const handleClick = async () => {
        if (steps[step].slug === 'template') {
            navigate(`/add-part/add-form`);
        }
        const isValid = await trigger(steps[step].fields);
        if (!isValid) return;
        setStep((prev) => {
            if (steps.length - 1 === step) return step;
            navigate(`/add-part/${steps[step + 1].slug}`);
            return prev + 1;
        });
    };
    return (
        <FormProvider {...methods}>
            {location.pathname === `/add-part` ? null : <ProgressBar progressLevel={step + 1} />}
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
            {location.pathname === `/add-part` ||
            location.pathname === '/add-part/add-form' ? null : (
                <ButtonWrapper>
                    <Button variant={step === 4 ? 'disabled' : 'black'} onClick={handleClick}>
                        NEXT2
                    </Button>
                </ButtonWrapper>
            )}
        </FormProvider>
    );
};

export default AddPart;
