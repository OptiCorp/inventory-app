import type { Dispatch, SetStateAction } from 'react';

export type Types = {
    id: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
    name: 'Unit' | 'Assembly' | 'Subassembly' | 'Part';
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
