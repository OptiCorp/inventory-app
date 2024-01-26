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
    | 'type'
    | 'category'
    | 'location'
    | 'productNumber'
    | 'serialNumber'
    | 'vendor'
    | 'description';
