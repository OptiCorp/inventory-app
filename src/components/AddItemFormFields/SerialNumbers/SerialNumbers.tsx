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
                        name={`serialNumber[0]`}
                        as="span"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledLabelContainer>

                <ScrollWrapContainer>
                    {value.map((serialNumber, index) => {
                        return (
                            <SerialNumber
                                key={index}
                                serialNumber={serialNumber}
                                isPlainText
                                onChange={(newValue: string) => {
                                    const newValues = [...value];
                                    newValues[index] = newValue;
                                    onChange(newValues);
                                }}
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
                CancelButtonOnClick={() => setIsOpen((prev) => !prev)}
                SubmitButtonOnClick={() => setIsOpen((prev) => !prev)}
            >
                {value.map((serialNumber, index) => {
                    return (
                        <div key={index}>
                            <SerialNumber
                                serialNumber={serialNumber}
                                onChange={(newValue: string) => {
                                    const newValues = [...value];
                                    newValues[index] = newValue;
                                    onChange(newValues);
                                }}
                            />
                        </div>
                    );
                })}
            </CustomDialog>
        </>
    );
};
