
import type { ChangeEvent, ComponentProps, Dispatch, SetStateAction } from "react"
import { Category, Location, Vendor } from "../../../services/apiTypes"




export type Types = 'Unit' | 'Assembly' | 'Subassembly' | 'Part'

export type SetState<T> = Dispatch<SetStateAction<T>>

export type EditableFieldProps = {
    label: ItemFields
    defaultValue: ComponentProps<"input">["defaultValue"]
    onBlur: ComponentProps<"input">["onBlur"]
    options?: Types[]
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
    handleInputChange?: (
        value: string | undefined
    ) => void 
    selectedType?: string
    multiline?: boolean
} 

export type StyledTextFieldProps = {
    $isOpen: boolean
}

export type TypeProps = {
    handleSelectChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
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
    | 'description'