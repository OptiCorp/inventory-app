import type { ComponentProps, Dispatch, SetStateAction } from 'react';
import { ActionMeta, PropsValue, SingleValue } from 'react-select';

export type Types = {
    id: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
    name: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
};

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type TypeProps = {
    handleSelectChange?: (
        newValue: SingleValue<{ value: string }>,
        actionMeta: ActionMeta<{ value: string }>
    ) => void;
    selectedType?: string;
    label: ItemFields;
    defaultValue: string | null;
    onBlur: ComponentProps<'input'>['onBlur'];
    options: Types[];
    value: string;
};

export type ItemFields =
    | 'type'
    | 'category'
    | 'location'
    | 'productNumber'
    | 'serialNumber'
    | 'vendor'
    | 'description';
