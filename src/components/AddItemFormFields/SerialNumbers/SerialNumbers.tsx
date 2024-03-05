import { ErrorMessage } from '@hookform/error-message';
import Edit from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { ItemSchema } from '../../../pages/addItem/hooks/itemValidator';
import { CustomDialog } from '../../CustomDialog/CustomDialog';
import { SerialNumber } from '../SerialNumber/SerialNumber';
import {
    ScrollWrapContainer,
    StyledErrorP,
    StyledIconContainer,
    StyledLabelContainer,
} from '../styles';

export const SerialNumbers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { control } = useFormContext<ItemSchema>();
    const {
        field: { value, onChange },
    } = useController({ name: 'serialNumber', control });

    const [oldSerialNumber, setOldSerialNumber] = useState(value);
    const [serialNumbers, setSerialNumber] = useState(value);

    const handleCancel = () => {
        setIsOpen((prev) => !prev);
        setSerialNumber(oldSerialNumber);
    };
    const handleChange = (newValue: string, index: number) => {
        setSerialNumber((prev) => {
            const newValues = [...prev];
            newValues[index] = newValue;
            return newValues;
        });
    };

    const handleSave = () => {
        onChange(serialNumbers);
        setOldSerialNumber(serialNumbers);
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <div>
                <StyledLabelContainer>
                    <StyledIconContainer>
                        <label>
                            <strong>Serial numbers</strong>
                        </label>
                        <Edit onClick={() => setIsOpen((prev) => !prev)} />
                    </StyledIconContainer>
                    <ErrorMessage
                        name={`serialNumber`}
                        as="span"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledLabelContainer>

                <ScrollWrapContainer>
                    {serialNumbers.map((serialNumber, index) => {
                        return (
                            <SerialNumber
                                key={index}
                                serialNumber={serialNumber}
                                isPlainText
                                onChange={(value) => handleChange(value, index)}
                            />
                        );
                    })}
                </ScrollWrapContainer>
            </div>
            <CustomDialog
                open={isOpen}
                fullWidth={true}
                onClose={() => setIsOpen((prev) => !prev)}
                title="Edit Serial number"
                CancelButtonOnClick={handleCancel}
                SubmitButtonOnClick={handleSave}
            >
                {serialNumbers.map((serialNumber, index) => {
                    return (
                        <div key={index}>
                            <SerialNumber
                                serialNumber={serialNumber}
                                onChange={(value) => handleChange(value, index)}
                            />
                        </div>
                    );
                })}
            </CustomDialog>
        </>
    );
};
