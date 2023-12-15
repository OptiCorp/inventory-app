import { useState } from 'react'
import { Item } from '../../../services/apiTypes'
import EditableField from './EditableField'
import { Container } from './styles'
import { TypeField } from './TypeField'
import { ItemFields } from './types'
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors'
import { SelectField } from './SelectField'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations'
import { useGetCategories } from '../../../services/hooks/Category/useGetCategories'
import useHandlePartInfo from './useHandlePartInfo'

const PartInfo = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors()
    const { data: locations = [], isLoading: isLoadingLocations } = useGetLocations()
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories()
    const [activeEditMode, setActiveEditMode] = useState<ItemFields | null>(null)
    const [selectedType, setSelectedType] = useState(item.type || '')
    const [selectedVendorId, setSelectedVendorId] = useState(item.vendorId)
    const [selectedLocationId, setSelectedLocationId] = useState(item.locationId)
    const [selectedCategoryId, setSelectedCategoryId] = useState(item.categoryId)
    const [updatedItem, setUpdatedItem] = useState(item)

    const handler = useHandlePartInfo(item)

    if (isLoading) {
        return <p>Loading.. </p>
    }

    return (
        <form>
            <Container>
                <TypeField
                    label="type"
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    defaultValue={selectedType || item.type || ''}
                    onBlur={handler.handleBlurSelectField(selectedType, 'type', item)}
                    handleSelectChange={(e) => handler.handleSelectChange(e, setSelectedType)}
                    options={['Unit', 'Assembly', 'Sub-Assembly', 'Part']}
                    selectedType={selectedType}
                />
                {!isLoadingCategories && (
                    <SelectField
                        label="category"
                        defaultValue={selectedCategoryId || item.category?.name || ''}
                        activeEditMode={activeEditMode}
                        setActiveEditMode={setActiveEditMode}
                        onBlur={handler.handleBlurSelectField(
                            selectedCategoryId,
                            'categoryId',
                            item
                        )}
                        handleSelectChange={(e) =>
                            handler.handleSelectChange(e, setSelectedCategoryId)
                        }
                        options={categories}
                        id={item.categoryId}
                    />
                )}

                {!isLoadingLocations && (
                    <SelectField
                        label="location"
                        defaultValue={selectedLocationId || item.location?.name || ''}
                        activeEditMode={activeEditMode}
                        setActiveEditMode={setActiveEditMode}
                        onBlur={handler.handleBlurSelectField(
                            selectedLocationId,
                            'locationId',
                            item
                        )}
                        handleSelectChange={(e) =>
                            handler.handleSelectChange(e, setSelectedLocationId)
                        }
                        options={locations}
                        id={item.locationId}
                    />
                )}

                <div>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {!item.user
                            ? 'Not specified'
                            : `${item.user.firstName} ${item.user.lastName}`}
                    </p>
                </div>

                <EditableField
                    label="productNumber"
                    defaultValue={item.productNumber}
                    onBlur={handler.handleBlurInputField('productNumber', updatedItem)}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) =>
                        handler.handleInputChange('productNumber', value, setUpdatedItem)
                    }
                />

                <EditableField
                    label="serialNumber"
                    defaultValue={item.serialNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handler.handleBlurInputField('serialNumber', updatedItem)}
                    handleInputChange={(value) => {
                        handler.handleInputChange('serialNumber', value, setUpdatedItem)
                    }}
                />

                {!isLoadingVendors && (
                    <SelectField
                        label="vendor"
                        defaultValue={selectedVendorId || item.vendor?.name || ''}
                        activeEditMode={activeEditMode}
                        setActiveEditMode={setActiveEditMode}
                        onBlur={handler.handleBlurSelectField(
                            selectedVendorId,
                            'vendorId',
                            updatedItem
                        )}
                        handleSelectChange={(e) =>
                            handler.handleSelectChange(e, setSelectedVendorId)
                        }
                        options={vendors}
                        id={item.vendorId}
                    />
                )}
            </Container>
            {handler.snackbar}
        </form>
    )
}

export default PartInfo
