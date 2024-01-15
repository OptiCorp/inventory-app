import { useContext, useState } from 'react'
import UmAppContext from '../../../contexts/UmAppContext'
import { useSnackBar } from '../../../hooks'
import type { Item } from '../../../services/apiTypes'
import { useGetCategories } from '../../../services/hooks/category/useGetCategories'
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations'
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors'

import { Container } from '@mui/material'
import EditableField from './EditableField'
import { SelectField } from './SelectField'
import { TypeField } from './TypeField'
import {
    useFormBlurInputHandler,
    useFormBlurSelectHandler,
    useFormInputChangeHandler,
    useFormSelectChangeHandler,
} from './hooks'
import { PartInfoForm } from './styles'


type Props = {
    item: Item
    isLoading: boolean
}

const PartInfo = ({ item, isLoading }: Props) => {
    const internalItem = { ...item }
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors()
    const { data: locations = [], isLoading: isLoadingLocations } =
        useGetLocations()
    const { data: categories = [], isLoading: isLoadingCategories } =
        useGetCategories()
    const [selectedType, setSelectedType] = useState<typeof item.type>(
        item.type
    )
    const [selectedVendorId, setSelectedVendorId] = useState<
        typeof item.vendorId
    >(item.vendorId)
    const [selectedLocationId, setSelectedLocationId] = useState<
        typeof item.locationId
    >(item.locationId)
    const [selectedCategoryId, setSelectedCategoryId] = useState<
        typeof item.categoryId
    >(item.categoryId)
    const [updatedItem, setUpdatedItem] = useState({ ...item })
    const blurCategorySelectField = useFormBlurSelectHandler(
        internalItem,
        categories
    )
    const blurLocationsSelectField = useFormBlurSelectHandler(
        internalItem,
        locations
    )
    const blurVendorsSelectField = useFormBlurSelectHandler(
        internalItem,
        vendors
    )
    const blurSelectField = useFormBlurSelectHandler(internalItem)
    const blurInputField = useFormBlurInputHandler(internalItem)
    const selectChange = useFormSelectChangeHandler()
    const inputChange = useFormInputChangeHandler()
    const { snackbar } = useSnackBar()
    const { setSnackbarText, setSnackbarSeverity } = useContext(UmAppContext)

    if (
        isLoading ||
        isLoadingCategories ||
        isLoadingLocations ||
        isLoadingVendors
    ) {
        return <p>Loading.. </p>
    }

    return (
        <PartInfoForm>
            <Container>
                <TypeField
                    label="type"
                    defaultValue={selectedType}
                    onBlur={() => {
                        blurSelectField(
                            selectedType!,
                            'type',
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }}
                    handleSelectChange={(value) => {
                        selectChange(value, setSelectedType)
                    }}
                    options={[
                        { name: 'Unit', id: 'Unit' },
                        { name: 'Assembly', id: 'Assembly' },
                        { name: 'Subassembly', id: 'Subassembly' },
                        { name: 'Part', id: 'Part' },
                    ]}
                    selectedType={selectedType}
                />

                <SelectField
                    label="category"
                    defaultValue={
                        selectedCategoryId ||
                        (item.category ? item.category.name : '')
                    }
                    onBlur={() =>
                        blurCategorySelectField(
                            selectedCategoryId,
                            'categoryId',
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }
                    handleSelectChange={(e) => {
                        selectChange(e, setSelectedCategoryId)
                    }}
                    options={categories}
                    id={item.categoryId}
                />

                <SelectField
                    label="location"
                    defaultValue={
                        selectedLocationId ||
                        (item.location ? item.location.name : '')
                    }
                    onBlur={() =>
                        blurLocationsSelectField(
                            selectedLocationId,
                            'locationId',
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }
                    handleSelectChange={(e) =>
                        selectChange(e, setSelectedLocationId)
                    }
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
                    onBlur={() =>
                        blurInputField(
                            'productNumber',
                            updatedItem,
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }
                    handleInputChange={(value) =>
                        inputChange('productNumber', value, setUpdatedItem)
                    }
                />

                <EditableField
                    label="serialNumber"
                    defaultValue={item.serialNumber}
                    onBlur={() =>
                        blurInputField(
                            'serialNumber',
                            updatedItem,
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }
                    handleInputChange={(value) =>
                        inputChange('serialNumber', value, setUpdatedItem)
                    }
                />

                <SelectField
                    label="vendor"
                    defaultValue={
                        selectedVendorId ||
                        (item.vendor ? item.vendor.name : '')
                    }
                    onBlur={() =>
                        blurVendorsSelectField(
                            selectedVendorId,
                            'vendorId',
                            setSnackbarText,
                            setSnackbarSeverity
                        )
                    }
                    handleSelectChange={(e) =>
                        selectChange(e, setSelectedVendorId)
                    }
                    options={vendors}
                    id={item.vendorId}
                />
            </Container>
            <EditableField
                label="description"
                defaultValue={item.description}
                handleInputChange={(value) =>
                    inputChange('description', value, setUpdatedItem)
                }
                multiline
                onBlur={() =>
                    blurInputField(
                        'description',
                        updatedItem,
                        setSnackbarText,
                        setSnackbarSeverity,
                        true
                    )
                }
            />

            {snackbar}
        </PartInfoForm>
    )
}

export default PartInfo
