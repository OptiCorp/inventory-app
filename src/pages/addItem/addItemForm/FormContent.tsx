import { TextField } from '@mui/material';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from '../../../components/AddItemFormFields/Category/Category';
import { Comment } from '../../../components/AddItemFormFields/Comment/Comment';
import { Description } from '../../../components/AddItemFormFields/Description/Description';
import { Location } from '../../../components/AddItemFormFields/Location/Location';
import { ProductNumber } from '../../../components/AddItemFormFields/ProductNumber/ProductNumber';
import { SerialNumber } from '../../../components/AddItemFormFields/SerialNumber/SerialNumber';
import { Type } from '../../../components/AddItemFormFields/TemplateTypes/TemplateTypes';
import { Vendor } from '../../../components/AddItemFormFields/Vendor/Vendor';
import { WpId } from '../../../components/AddItemFormFields/WpId/WpId';
import { v4 as uuid } from 'uuid';
import AppContext from '../../../contexts/AppContext';
import { ItemSchema } from '../hooks/itemValidator';
import CustomDialog from '../../../components/CustomDialog/CustomDialog';
import { Edit, LabelContainer } from '../../itemDetails/itemInfo/styles';

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
                <LabelContainer>
                    <label>
                        <strong>WP ids</strong>
                    </label>
                    <Edit onClick={() => setIsOpen((prev) => ({ ...prev, wpId: true }))} />
                </LabelContainer>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {wpIds.map((wpId, index) => {
                        const fieldName = `wpId[${index}]`;
                        return (
                            <>
                                <WpId
                                    wpId={wpId}
                                    fieldName={fieldName}
                                    isPlainText
                                    onChange={(value: string) =>
                                        handleChange(wpIds, index, value, setWpIds)
                                    }
                                />
                            </>
                        );
                    })}
                </div>
            </div>

            <CustomDialog
                open={isOpen.wpId}
                onClose={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
                title="Edit WpIds"
                CancelButtonOnClick={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
                SubmitButtonOnClick={() => setIsOpen((prev) => ({ ...prev, wpId: false }))}
            >
                {wpIds.map((wpId, index) => {
                    const fieldName = `wpId[${index}]`;
                    return (
                        <WpId
                            key={index}
                            wpId={wpId}
                            fieldName={fieldName}
                            onChange={(value: string) =>
                                handleChange(wpIds, index, value, setWpIds)
                            }
                        />
                    );
                })}
            </CustomDialog>
            <div>
                <LabelContainer>
                    <label>
                        <strong>Serial numbers</strong>
                    </label>
                    <Edit onClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: true }))} />
                </LabelContainer>

                <div style={{ display: 'flex', gap: '10px' }}>
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
                </div>
            </div>

            <ProductNumber />
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
                title="Edit serial numbers"
                onClose={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
                CancelButtonOnClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
                SubmitButtonOnClick={() => setIsOpen((prev) => ({ ...prev, serialNumber: false }))}
            >
                {serialNumbers.map((serialNumber, index) => {
                    const fieldName = `serialNumber[${index}]`;
                    return (
                        <SerialNumber
                            key={index}
                            serialNumber={serialNumber}
                            fieldName={fieldName}
                            isPlainText={false}
                            onChange={(value: string) =>
                                handleChange(serialNumbers, index, value, setSerialNumbers)
                            }
                        />
                    );
                })}
            </CustomDialog>
        </>
    );
};
