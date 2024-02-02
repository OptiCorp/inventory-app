import type { Dispatch, SetStateAction } from 'react';
import { Item } from '../../../services/apiTypes';

export type Types = {
    id: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
    name: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
};

export type Options = {
    label: string;
    value: Item;
};

export type Open = {
    parent: boolean;
    child: boolean;
};

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type ItemFields =
    | 'itemTemplate.type'
    | 'itemTemplate.category'
    | 'location'
    | 'itemTemplate.productNumber'
    | 'serialNumber'
    | 'vendor'
    | 'itemTemplate.description'
    | 'wpId';

export type FieldNames =
    | 'TYPE'
    | 'CATEGORY'
    | 'LOCATION'
    | 'S/N'
    | 'P/N'
    | 'VENDOR'
    | 'DESCRIPTION'
    | 'WPID';
