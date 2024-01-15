import { AlertColor } from '@mui/material';
import { useCallback, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import UmAppContext from '../../../../contexts/UmAppContext';
import { Item, UpdateItem } from '../../../../services/apiTypes';
import { useUpdateItem } from '../../../../services/hooks/items/useUpdateItem';
import { SetState } from '../types';
import { PartInfoSchema } from './useUpdatePartForm';

export const useFormBlurInputHandler = (obj: Item) => {
    const formContext = useFormContext<PartInfoSchema>();
    const { currentUser } = useContext(UmAppContext);
    const { mutate } = useUpdateItem(obj.id, currentUser!.id);
    const handleBlurInputField = useCallback(
        <T extends keyof UpdateItem>(
            field: T,
            updatedObject: Item,
            setSnackbarText: SetState<string>,
            setSnackbarSeverity: SetState<AlertColor>,
            shortSnackbarText?: boolean
        ) => {
            formContext
                .handleSubmit(() => {
                    const fieldValue = updatedObject[field];
                    if (!fieldValue || fieldValue === obj[field]) return;

                    mutate(
                        {
                            ...obj,
                            [field]: fieldValue,
                        },
                        {
                            onSuccess(data) {
                                if (data) {
                                    if (data.status >= 400) {
                                        setSnackbarSeverity('error');
                                        setSnackbarText(`${data.statusText}, please try again.`);
                                    } else if (data.status >= 500) {
                                        setSnackbarSeverity('error');
                                        setSnackbarText(
                                            `Something went wrong on our end, please try again later.`
                                        );
                                    } else if (shortSnackbarText) {
                                        setSnackbarText(`${field.toUpperCase()} was updated`);
                                    } else {
                                        setSnackbarText(
                                            `${field.toUpperCase()} was changed to ${String(
                                                fieldValue
                                            )}`
                                        );
                                    }
                                }
                            },
                        }
                    );
                })()
                .catch((error) => {
                    console.error('Failed to submit form: ', error);
                });
        },
        [formContext, mutate, obj]
    );
    return handleBlurInputField;
};
