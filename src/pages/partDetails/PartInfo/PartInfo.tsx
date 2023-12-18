import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import UmAppContext from '../../../contexts/UmAppContext'
import useSnackBar from '../../../hooks/useSnackbar'
import { Item, UpdateItem } from '../../../services/apiTypes'
import { useGetCategories } from '../../../services/hooks/Category/useGetCategories'
import { useUpdateItem } from '../../../services/hooks/Items/useUpdateItem'
import { useGetLocations } from '../../../services/hooks/Locations/useGetLocations'
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors'
import { PartSchemaTest } from '../useUpdatePartForm'
import EditableField from './EditableField'
import { SelectField } from './SelectField'
import { TypeField } from './Types/TypeField'
import { Container } from './styles'
import { ItemFields } from './types'
import { MenuItem } from '@mui/base'

const PartInfo = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
    const { currentUser } = useContext(UmAppContext)
    const { mutate, status } = useUpdateItem(item.id, currentUser!.id)
    const { data = [] } = useGetVendors()
    const { data: locationsData = [] } = useGetLocations()
    const { data: categoryData = [] } = useGetCategories()
    const { snackbar, setSnackbarText } = useSnackBar()
    const [activeEditMode, setActiveEditMode] = useState<ItemFields | null>(
        null
    )
    const [selectedType, setSelectedType] = useState(item.type || '')
    const [selectedVendorId, setSelectedVendorId] = useState(item.vendorId)
    const [selectedLocationId, setSelectedLocationId] = useState(
        item.locationId
    )
    const [selectedCategoryId, setSelectedCategoryId] = useState(
        item.categoryId
    )
    const [updatedItem, setUpdatedItem] = useState(item)
    const [changedField, setChangedField] = useState('')
    const formContext = useFormContext<PartSchemaTest>()

    const handleBlur = (selected: string, field: string, obj: Item) =>
        formContext.handleSubmit(() => {
            const fieldValue = obj[field]
            console.log(selected, fieldValue)
            if (selected === fieldValue) return
            mutate({
                ...obj,
                [field]: selected,
            })
        })

    const handleBlurSerialNumber = formContext.handleSubmit(() => {
        if (
            !updatedItem.serialNumber ||
            updatedItem.serialNumber === item.serialNumber
        )
            return
        mutate({
            ...item,
            serialNumber: updatedItem.serialNumber,
        })
    })

    const handleBlurProductNumber = formContext.handleSubmit(() => {
        if (
            !updatedItem.productNumber ||
            updatedItem.productNumber === item.productNumber
        )
            return
        mutate({
            ...item,
            productNumber: updatedItem.productNumber,
        })
    })

    const handleSelectChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedType(e.target.value)
    }

    const handleVendorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newVendorId = e.target.value
        setSelectedVendorId(newVendorId)
        /* setUpdatedItem((prev) => ({ ...prev, vendorId: newVendorId })) */
    }
    const handleLocationChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newLocationId = e.target.value
        setSelectedLocationId(newLocationId)
    }
    const handleCategoryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newCategoryId = e.target.value
        setSelectedCategoryId(newCategoryId)
    }

    const handleInputChange = (
        fieldName: keyof UpdateItem,
        value: string | undefined
    ) => {
        setUpdatedItem((prev) => {
            return {
                ...prev,
                [fieldName]: value,
            }
        })
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
                <TypeField
                    label="type"
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    defaultValue={selectedType ? selectedType : item.type}
                    onBlur={handleBlur(selectedType, 'type', item)}
                    handleSelectChange={handleSelectChange}
                    options={['Unit', 'Assembly', 'Sub-Assembly', 'Part']}
                    selectedType={selectedType}
                />

                <SelectField
                    label="category"
                    defaultValue={
                        selectedCategoryId
                            ? selectedCategoryId
                            : item.category?.name
                    }
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlur(selectedCategoryId, 'categoryId', item)}
                    handleSelectChange={handleCategoryChange}
                    options={categoryData}
                    id={item.categoryId}
                />

                <SelectField
                    label="location"
                    defaultValue={
                        selectedLocationId
                            ? selectedLocationId
                            : item.location?.name
                    }
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlur(selectedLocationId, 'locationId', item)}
                    handleSelectChange={handleLocationChange}
                    options={locationsData}
                    id={item.locationId}
                > 
                    {locationsData?.map((option) => (
                        <MenuItem key={option.name} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </SelectField>

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
                    onBlur={handleBlurProductNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) =>
                        handleInputChange('productNumber', value)
                    }
                />

                <EditableField
                    label="serialNumber"
                    defaultValue={item.serialNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurSerialNumber}
                    handleInputChange={(value) =>
                        handleInputChange('serialNumber', value)
                    }
                />

                <SelectField
                    label="vendor"
                    defaultValue={
                        selectedVendorId ? selectedVendorId : item.vendor?.name
                    }
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlur(selectedVendorId, 'vendorId', item)}
                    handleSelectChange={handleVendorChange}
                    options={data}
                    id={item.vendorId}
                />
            </Container>
            {snackbar}
        </form>
    )
}

export default PartInfo
