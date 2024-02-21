import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { Category } from '../../../components/AddItemFormFields/Category/Category';
import { Comment } from '../../../components/AddItemFormFields/Comment/Comment';
import { Description } from '../../../components/AddItemFormFields/Description/Description';
import { Location } from '../../../components/AddItemFormFields/Location/Location';
import { ProductNumber } from '../../../components/AddItemFormFields/ProductNumber/ProductNumber';
import { Revision } from '../../../components/AddItemFormFields/Revision/Revision';
import { SerialNumber } from '../../../components/AddItemFormFields/SerialNumber/SerialNumber';
import { Type } from '../../../components/AddItemFormFields/TemplateTypes/TemplateTypes';
import { Vendor } from '../../../components/AddItemFormFields/Vendor/Vendor';
import { WpId } from '../../../components/AddItemFormFields/WpId/WpId';
import { ScrollWrapContainer, StyledErrorP } from '../../../components/AddItemFormFields/styles';
import { CustomDialog } from '../../../components/CustomDialog/CustomDialog';
import AppContext from '../../../contexts/AppContext';
import { Edit } from '../../itemDetails/itemInfo/styles';
import { ItemSchema } from '../hooks/itemValidator';
import { StyledIconContainer, StyledLabelContainer } from './styles';

export const FormContent = () => {
    const { currentUser } = useContext(AppContext);
    const { register, getValues } = useFormContext<ItemSchema>();
    const [wpIds, setWpIds] = useState<string[]>([]);
    const [serialNumbers, setSerialNumbers] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState({
        serialNumber: false,
        wpId: false,
    });
    const numberOfItems = parseInt(getValues('numberOfItems'));

    useEffect(() => {
        const uniqueWpIds = Array.from({ length: numberOfItems }, () => uuid().slice(0, 8));
        const uniqueSerialNumbers = Array.from({ length: numberOfItems }, () => uuid().slice(0, 8));
        setWpIds(uniqueWpIds);
        setSerialNumbers(uniqueSerialNumbers);
    }, [numberOfItems]);

    /**
     * Updates a specific element in an array and calls a setter function to update the state.
     * @param {T[]} array The array to be updated.
     * @param index The index of the element to be updated.
     * @param value The new value to set at the specified index.
     * @param setter The setter function to update the state with the modified array.
     */
    const handleChange = <T,>(
        array: T[],
        index: number,
        value: T,
        setter: (value: SetStateAction<T[]>) => void
    ): void => {
        const newNumbers = [...array];
        newNumbers[index] = value;
        setter(newNumbers);
    };

    return (
        <>
            <Type />
            <Category />
            <div>
                <StyledLabelContainer>
                    <StyledIconContainer>
                        <label>
                            <strong>WP ids</strong>
                        </label>
                        <Edit onClick={() => setIsOpen((prev) => ({ ...prev, wpId: true }))} />
                    </StyledIconContainer>
                    <ErrorMessage
                        name={`wpId[${0}]`}
                        as="span"
                        render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                    />
                </StyledLabelContainer>

                <ScrollWrapContainer>
                    {wpIds.map((wpId, index) => {
                        const fieldName = `wpId[${index}]`;
                        return (
                            <WpId
                                key={index}
                                wpId={wpId}
                                fieldName={fieldName}
                                isPlainText
                                onChange={(value: string) =>
                                    handleChange(wpIds, index, value, setWpIds)
                                }
                            />
                        );
                    })}
                </ScrollWrapContainer>
            </div>

            <CustomDialog
                open={isOpen.wpId}
                fullWidth={true}
                onClose={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
                title="Edit WpIds"
                CancelButtonOnClick={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
                SubmitButtonOnClick={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
            >
                {wpIds.map((wpId, index) => {
                    const fieldName = `wpId[${index}]`;
                    return (
                        <div key={index}>
                            <WpId
                                wpId={wpId}
                                fieldName={fieldName}
                                onChange={(value: string) =>
                                    handleChange(wpIds, index, value, setWpIds)
                                }
                            />
                        </div>
                    );
                })}
            </CustomDialog>
            <StyledLabelContainer>
                <StyledIconContainer>
                    <label>
                        <strong>Serial numbers</strong>
                    </label>
                    <Edit onClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: true }))} />
                </StyledIconContainer>
                <ErrorMessage
                    name={`serialNumber[${0}]`}
                    render={({ message }) => <StyledErrorP>{message}</StyledErrorP>}
                />
            </StyledLabelContainer>
            <ScrollWrapContainer>
                {serialNumbers.map((serialNumber, index) => {
                    const fieldName = `serialNumber[${index}]`;
                    return (
                        <SerialNumber
                            key={index}
                            serialNumber={serialNumber}
                            fieldName={fieldName}
                            isPlainText
                            onChange={(value: string) =>
                                handleChange(serialNumbers, index, value, setSerialNumbers)
                            }
                        />
                    );
                })}
            </ScrollWrapContainer>
            <ProductNumber />
            <Revision />
            <Vendor />
            <Location />
            <Description />
            <Comment />
            <TextField
                id="filled-disabled"
                sx={{ display: 'none' }}
                label=""
                {...register('createdById', { value: currentUser?.id })}
            />
            <CustomDialog
                open={isOpen.serialNumber}
                fullWidth={true}
                title="Edit serial numbers"
                onClose={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
                CancelButtonOnClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
                SubmitButtonOnClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
            >
                {serialNumbers.map((serialNumber, index) => {
                    const fieldName = `serialNumber[${index}]`;
                    return (
                        <div key={index}>
                            <SerialNumber
                                serialNumber={serialNumber}
                                fieldName={fieldName}
                                isPlainText={false}
                                onChange={(value: string) =>
                                    handleChange(serialNumbers, index, value, setSerialNumbers)
                                }
                            />
                        </div>
                    );
                })}
            </CustomDialog>
        </>
    );
};
