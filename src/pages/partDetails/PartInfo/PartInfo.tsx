import { useState } from 'react'
import type { Item } from '../../../services/apiTypes'
import EditableField from './EditableField'
import { Container } from './styles'
import { TypeField } from './TypeField'
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors'
import { SelectField } from './SelectField'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations'
import { useGetCategories } from '../../../services/hooks/Category/useGetCategories'
import useFormBlurSelectHandler from './hooks/useFormBlurSelectHandler'
import useFormBlurInputHandler from './hooks/useFormBlurInputHandler'
import useFormSelectChangeHandler from './hooks/useFormSelectChangeHandler'
import useFormInputChangeHandler from './hooks/useFormInputChangeHandler'
import useSnackBar from '../../../hooks/useSnackbar'

type Props = {
    item: Item
    isLoading: boolean
}

const PartInfo = ({ item, isLoading }: Props) => {
    const internalItem = { ...item }
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors()
    const { data: locations = [], isLoading: isLoadingLocations } = useGetLocations()
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories()
    const [selectedType, setSelectedType] = useState<typeof item.type>(item.type)
    const [selectedVendorId, setSelectedVendorId] = useState<typeof item.vendorId>(item.vendorId)
    const [selectedLocationId, setSelectedLocationId] = useState<typeof item.locationId>(
        item.locationId
    )
    const [selectedCategoryId, setSelectedCategoryId] = useState<typeof item.categoryId>(
        item.categoryId
    )
    const [updatedItem, setUpdatedItem] = useState({ ...item })
    const blurCategorySelectField = useFormBlurSelectHandler(internalItem, categories)
    const blurLocationsSelectField = useFormBlurSelectHandler(internalItem, locations)
    const blurVendorsSelectField = useFormBlurSelectHandler(internalItem, vendors)
    const blurSelectField = useFormBlurSelectHandler(internalItem)
    const blurInputField = useFormBlurInputHandler(internalItem)
    const selectChange = useFormSelectChangeHandler()
    const inputChange = useFormInputChangeHandler()
    const { snackbar, setSnackbarText } = useSnackBar()

    if (isLoading || isLoadingCategories || isLoadingLocations || isLoadingVendors) {
        return <p>Loading.. </p>
    }

    return (
        <form>
            <Container>
                <TypeField
                    label="type"
                    defaultValue={selectedType || item.type}
                    onBlur={() => blurSelectField(selectedType!, 'type', setSnackbarText)}
                    handleSelectChange={(e) => selectChange(e, setSelectedType)}
                    options={['Unit', 'Assembly', 'Sub-Assembly', 'Part']}
                    selectedType={selectedType}
                />

                <SelectField
                    label="category"
                    defaultValue={selectedCategoryId || item.category?.name}
                    onBlur={() =>
                        blurCategorySelectField(selectedCategoryId, 'categoryId', setSnackbarText)
                    }
                    handleSelectChange={(e) => selectChange(e, setSelectedCategoryId)}
                    options={categories}
                    id={item.categoryId}
                />

                <SelectField
                    label="location"
                    defaultValue={selectedLocationId || item.location?.name}
                    onBlur={() =>
                        blurLocationsSelectField(selectedLocationId, 'locationId', setSnackbarText)
                    }
                    handleSelectChange={(e) => selectChange(e, setSelectedLocationId)}
                    options={locations}
                    id={item.locationId}
                />

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
                    onBlur={() => blurInputField('productNumber', updatedItem, setSnackbarText)}
                    handleInputChange={(value) =>
                        inputChange('productNumber', value, setUpdatedItem)
                    }
                />

                <EditableField
                    label="serialNumber"
                    defaultValue={item.serialNumber}
                    onBlur={() => blurInputField('serialNumber', updatedItem, setSnackbarText)}
                    handleInputChange={(value) =>
                        inputChange('serialNumber', value, setUpdatedItem)
                    }
                />

                <SelectField
                    label="vendor"
                    defaultValue={selectedVendorId || item.vendor?.name}
                    onBlur={() =>
                        blurVendorsSelectField(selectedVendorId, 'vendorId', setSnackbarText)
                    }
                    handleSelectChange={(e) => selectChange(e, setSelectedVendorId)}
                    options={vendors}
                    id={item.vendorId}
                />
            </Container>
            {snackbar}
        </form>
    )
}

export default PartInfo
