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
    const handleOnNumberOfChangeItems = (
        _event: React.FocusEvent<HTMLInputElement> | React.PointerEvent | React.KeyboardEvent,
        value = 0
    ) => {
        onChangeNumberOfItems(value);

        const isBatch = value > 1;
        setValue('isBatch', !!isBatch);

        const uniqueWpIds = Array.from({ length: value }, () => uuid().slice(0, 8));
        const uniqueSerialNumbers = Array.from({ length: value }, () => uuid().slice(0, 8));

        setValue('wpId', uniqueWpIds);
        setValue('serialNumber', uniqueSerialNumbers);
    };

    return {
        isBatch: value,
        numberOfItemsField: {
            onChange: handleOnNumberOfChangeItems,
            ...rest,
        },
        error,
    };
};
