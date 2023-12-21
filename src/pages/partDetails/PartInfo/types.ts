
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Category, Location, Vendor } from "../../../services/apiTypes"




export type Types = 'Unit' | 'Assembly' | 'Subassembly' | 'Part'

export type SetState<T> = Dispatch<SetStateAction<T>>
export type EditableFieldProps = {
    label: ItemFields
    defaultValue: string
    onBlur: () => void
    options?: Types[]
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    handleInputChange?: (
        value: string | undefined
    ) => void /* (fieldName: keyof UpdateItem, value: string | undefined) => void */
    selectedType?: string
}

export type TypeProps = {
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    selectedType?: string
    label: ItemFields
    defaultValue: string | null
    onBlur: () => void
    options: Types[]
}

export type SelectProps = {
    id: string
    selectedType?: string
    label: ItemFields
    defaultValue: string | null
    options: Vendor[] | Category[] | Location[]
    onBlur: () => void
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export type ItemFields =
    | 'type'
    | 'category'
    | 'location'
    | 'productNumber'
    | 'serialNumber'
    | 'vendor'