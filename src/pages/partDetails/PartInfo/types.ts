import type { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from 'react';
import { ActionMeta, PropsValue, SingleValue } from 'react-select';
import { Category, Vendor } from '../../../services/apiTypes';


export type Types = {
    id: 'Unit' | 'Assembly' | 'Subassembly' | 'Part'
    name: 'Unit' | 'Assembly' | 'Subassembly' | 'Part'
}

export type SetState<T> = Dispatch<SetStateAction<T>>

export type EditableFieldProps = {
    label: ItemFields;
    defaultValue: ComponentProps<'input'>['defaultValue'];
    onBlur: ComponentProps<'input'>['onBlur'];
    options?: Types[];
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleInputChange?: (value: string | undefined) => void;
    selectedType?: string;
    multiline?: boolean;
};

export type StyledTextFieldProps = {
    $isOpen: boolean;
};

export type TypeProps = {
    handleSelectChange?: (newValue: SingleValue<{ value: string}>, actionMeta: ActionMeta<{ value: string }>) => void
    selectedType?: string
    label: ItemFields
    defaultValue: string | null
    onBlur: ComponentProps<"input">["onBlur"]
    options: Types[]
}

export type SelectProps = {
    id: string
    selectedType?: string
    label: ItemFields
    defaultValue: PropsValue<{ value: string}>  | string
    options: Types[] | Category[] | Vendor[]
    onBlur: () => void
    handleSelectChange?: (newValue: SingleValue<{ value: string}>, actionMeta: ActionMeta<{ value: string }>) => void
}

export type ItemFields =
    | 'type'
    | 'category'
    | 'location'
    | 'productNumber'
    | 'serialNumber'
    | 'vendor'
    | 'description';
