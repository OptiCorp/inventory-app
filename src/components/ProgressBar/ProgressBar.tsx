import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import { PartSchema } from '../../pages/addPart/hooks/partValidator';
type stepsSchema = keyof PartSchema;
type ProgressBarProps = {
    activeStep: number;
    steps: { fields: stepsSchema[]; slug: string }[];
};

const ProgressBar: React.FC<ProgressBarProps> = ({ activeStep, steps }) => {
    return (
        <>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((stepLabel, index) => (
                    <Step key={stepLabel.slug}>
                        <StepLabel>{index + 1}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

export default ProgressBar;
