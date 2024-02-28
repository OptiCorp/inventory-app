import { ChangeEvent } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { ItemSchema } from '../../hooks/itemValidator';

export const useBatchForm = () => {
    const { control, setValue } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
        fieldState: { error },
    } = useController({
        control,
        name: 'isBatch',
    });
    const {
        field: { onChange: onChangeNumberOfItems, ...rest },
    } = useController({
        control,
        name: 'numberOfItems',
    });
    const handleOnNumberOfChangeItems = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChangeNumberOfItems(e.target.value);
        const uniqueWpIds = Array.from({ length: +e.target.value }, () => uuid().slice(0, 8));
        const uniqueSerialNumbers = Array.from({ length: +e.target.value }, () =>
            uuid().slice(0, 8)
        );
        setValue('wpId', uniqueWpIds);
        setValue('serialNumber', uniqueSerialNumbers);
    };

    return {
        isBatch: value,
        onChangeIsBatch: onChange,
        numberOfItemsField: {
            onChange: handleOnNumberOfChangeItems,
            ...rest,
        },
        error,
    };
};
