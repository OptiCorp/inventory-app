export type Types = 'Unit' | 'Assembly' | 'Sub-Assembly' | 'Part'

export type EditableFieldProps = {
    label: ItemFields
    defaultValue: string | null
    onBlur: () => void
    isSelect?: boolean
    options?: Types[]
    activeEditMode: ItemFields | null
    setActiveEditMode: React.Dispatch<React.SetStateAction<ItemFields | null>>
    handleSelectChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleInputChange?: (
        value: string | undefined
    ) => void /* (fieldName: keyof UpdateItem, value: string | undefined) => void */
    selectedType?: string
}

export type TypeProps = {
    handleSelectChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    selectedType?: string
    label: ItemFields
    defaultValue: string | null
    onBlur: () => void

    options?: Types[]
    activeEditMode: ItemFields | null
    setActiveEditMode: React.Dispatch<React.SetStateAction<ItemFields | null>>
}

export type ItemFields =
    | 'Type'
    | 'Category'
    | 'Location'
    | 'P/N'
    | 'S/N'
    | 'Vendor'
