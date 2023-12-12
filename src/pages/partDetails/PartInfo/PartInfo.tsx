import { ChangeEvent, useEffect, useState } from 'react'
import { Item, UpdateItem } from '../../../services/apiTypes'
import { Container } from './styles'
import { useUpdateItem } from '../../../services/hooks/useUpdateItem'
import EditableField from './EditableField'

import { PartSchemaTest } from '../useUpdatePartForm'
import useSnackBar from '../../../hooks/useSnackbar'

export type ItemFields = 'Type' | 'Category' | 'Location' | 'P/N' | 'S/N' | 'Vendor'

const PartInfo = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
    const { mutate, status } = useUpdateItem(item.id)

    const { snackbar, setSnackbarText } = useSnackBar()
    const [activeEditMode, setActiveEditMode] = useState<ItemFields | null>(null)
    const [selectedType, setSelectedType] = useState(item.type || '')
    const [updatedItem, setUpdatedItem] = useState(item)
    const [changedField, setChangedField] = useState('')

    const handleBlurType = () => {
        if (selectedType.length) {
            mutate({
                ...item,
                type: selectedType,
            })
        }
    }

    const handleBlurCategory = () => {
        if (!updatedItem.category || updatedItem.category === item.category) return
        mutate({
            ...item,
            category: updatedItem.category,
        })
    }
    const handleBlurLocation = () => {
        if (!updatedItem.location || updatedItem.location === item.location) return
        mutate({
            ...item,
            location: updatedItem.location,
        })
    }

    const handleBlurSerialNumber = () => {
        if (!updatedItem.serialNumber || updatedItem.serialNumber === item.serialNumber) return
        mutate({
            ...item,
            serialNumber: updatedItem.serialNumber,
        })
    }

    const handleBlurProductNumber = (data: PartSchemaTest) => {
        mutate({
            ...item,
            productNumber: data.productNumber,
        })
    }

    const handleBlurVendor = () => {
        if (!updatedItem.vendor || updatedItem.vendor === item.vendor) return
        mutate({
            ...item,
            vendor: updatedItem.vendor,
        })
    }
    const handleSelectChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedType(e.target.value)
    }
    const handleInputChange = (fieldName: keyof UpdateItem, value: string | undefined) => {
        setUpdatedItem((prev) => ({
            ...prev,
            [fieldName]: value,
        }))
        setChangedField(fieldName)
    }
    useEffect(() => {
        if (status === 'success') {
            setSnackbarText(
                `${changedField
                    .split(/(?=[A-Z])/)
                    .join(' ')
                    .toLowerCase()} changed`
            )
        }
        if (status === 'error') {
            setSnackbarText('error')
        }
    }, [changedField, setSnackbarText, status])

    if (isLoading) {
        return <p>Loading.. </p>
    }

    return (
        <form>
            <Container>
                <EditableField
                    label="Type"
                    defaultValue={selectedType ? selectedType : item.type}
                    onBlur={handleBlurType}
                    isSelect
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    options={['Unit', 'Assembly', 'Sub-Assembly', 'Part']}
                    handleSelectChange={handleSelectChange}
                    selectedType={selectedType}
                />

                <EditableField
                    label="Category"
                    defaultValue={item.category}
                    onBlur={handleBlurCategory}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) => handleInputChange('category', value)}
                />

                <EditableField
                    label="Location"
                    defaultValue={item.location}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurLocation}
                    handleInputChange={(value) => handleInputChange('location', value)}
                />

                <div>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {item.addedByFirstName === null && item.addedByLastName === null
                            ? 'Not specified'
                            : `${item.addedByFirstName} ${item.addedByLastName}`}
                    </p>
                </div>
                <EditableField
                    label="S/N"
                    defaultValue={item.serialNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurSerialNumber}
                    handleInputChange={(value) => handleInputChange('serialNumber', value)}
                />

                <EditableField
                    label="P/N"
                    defaultValue={item.productNumber}
                    onBlur={handleBlurProductNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) => handleInputChange('productNumber', value)}
                />
                <EditableField
                    label="Vendor"
                    defaultValue={item.vendor}
                    onBlur={handleBlurVendor}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) => handleInputChange('vendor', value)}
                />
            </Container>
            {snackbar}
        </form>
    )
}

export default PartInfo
