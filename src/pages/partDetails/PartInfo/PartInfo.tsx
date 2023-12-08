import { ChangeEvent, useState } from 'react'
import { Item, UpdateItem } from '../../../services/apiTypes'
import { Container } from './styles'
import { useUpdateItem } from '../../../services/hooks/useUpdateItem'
import EditableField from './EditableField'

export type ItemFields = 'Type' | 'Category' | 'Location' | 'P/N' | 'S/N' | 'Vendor'

const PartInfo = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
    const { mutate } = useUpdateItem(item.id)

    const [activeEditMode, setActiveEditMode] = useState<ItemFields | null>(null)
    const [selectedType, setSelectedType] = useState(item.type || '')
    const [updatedItem, setUpdatedItem] = useState(item)
    const handleBlurType = () => {
        if (selectedType.length) {
            mutate({
                ...item,
                type: selectedType,
            })
        }
    }

    const handleBlurCategory = () => {
        if (updatedItem.category !== undefined && item.category !== updatedItem.category) {
            mutate({
                ...item,
                category: updatedItem.category,
            })
        }
    }
    const handleBlurLocation = () => {
        if (updatedItem.location !== undefined && item.location !== updatedItem.location) {
            mutate({
                ...item,
                location: updatedItem.location,
            })
        }
    }

    const handleBlurSerialNumber = () => {
        if (
            updatedItem.serialNumber !== undefined &&
            item.serialNumber !== updatedItem.serialNumber
        ) {
            mutate({
                ...item,
                serialNumber: updatedItem.serialNumber,
            })
        }
    }

    const handleBlurProductNumber = () => {
        if (
            updatedItem.productNumber !== undefined &&
            item.productNumber !== updatedItem.productNumber
        ) {
            mutate({
                ...item,
                productNumber: updatedItem.productNumber,
            })
        }
    }

    const handleBlurVendor = () => {
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
    }

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

                {
                    <EditableField
                        label="Category"
                        defaultValue={item.category}
                        onBlur={handleBlurCategory}
                        activeEditMode={activeEditMode}
                        setActiveEditMode={setActiveEditMode}
                        handleInputChange={(value) => handleInputChange('category', value)}
                    />
                }

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
        </form>
    )
}

export default PartInfo
