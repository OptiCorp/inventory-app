import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import React from 'react';

type ProgressBarProps = {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ activeStep, handleNext, handleBack }) => {
    return (
        <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: 400, flexGrow: 1, color: 'black' }}
            nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                    Next
                    <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
        />
    );
};

export default ProgressBar;
