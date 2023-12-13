import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Item, UpdateItem } from '../../../services/apiTypes'
import { useUpdateItem } from '../../../services/hooks/Items/useUpdateItem'
import EditableField from './EditableField'
import { Container } from './styles'

import { useFormContext } from 'react-hook-form'
import useSnackBar from '../../../hooks/useSnackbar'
import { PartSchemaTest } from '../useUpdatePartForm'
import { TypeField } from './TypeField'
import { ItemFields } from './types'
import UmAppContext from '../../../contexts/UmAppContext'
import { useGetVendors } from '../../../services/hooks/Vendor/useGetVendors'
import { VendorField } from './VendorField'

const PartInfo = ({ item, isLoading }: { item: Item; isLoading: boolean }) => {
    const { currentUser } = useContext(UmAppContext)

    const { mutate, status } = useUpdateItem(item.id, currentUser!.id)
    const { data = [] } = useGetVendors()
    const { snackbar, setSnackbarText } = useSnackBar()
    const [activeEditMode, setActiveEditMode] = useState<ItemFields | null>(null)
    const [selectedType, setSelectedType] = useState(item.type || '')
    const [selectedVendorId, setSelectedVendorId] = useState(item.vendorId)
    const [updatedItem, setUpdatedItem] = useState(item)
    const [changedField, setChangedField] = useState('')
    const formContext = useFormContext<PartSchemaTest>()

    const handleBlurType = () => {
        if (selectedType === item.type) return
        if (selectedType.length) {
            mutate({
                ...item,
                type: selectedType,
            })
        }
    }

    const handleBlurVendor = formContext.handleSubmit(() => {
        if (selectedVendorId === item.vendorId) return
        mutate({
            ...item,
            vendorId: selectedVendorId,
        })
    })

    /* const handleBlurCategory = () => {
        if (!updatedItem.category || updatedItem.category === item.category) return
        mutate({
            ...item,
            category: updatedItem.category,
        })
    } */
    /* const handleBlurLocation = () => {
        if (!updatedItem.location || updatedItem.location === item.location) return
        mutate({
            ...item,
            location: updatedItem.location,
        })
    } */

    const handleBlurSerialNumber = formContext.handleSubmit(() => {
        if (!updatedItem.serialNumber || updatedItem.serialNumber === item.serialNumber) return
        mutate({
            ...item,
            serialNumber: updatedItem.serialNumber,
        })
    })

    /* const handleBlurProductNumber = formContext.handleSubmit(async (data) => {
        await formContext.trigger()
        if (!data.productNumber) return

        console.log('data: ', data)
        mutate({
            ...item,
            productNumber: data.productNumber,
        })
    }, console.log) */
    const handleBlurProductNumber = formContext.handleSubmit(() => {
        if (!updatedItem.productNumber || updatedItem.productNumber === item.productNumber) return
        mutate({
            ...item,
            productNumber: updatedItem.productNumber,
        })
    }, console.log)

    const handleSelectChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setSelectedType(e.target.value)
    }

    const handleVendorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newVendorId = e.target.value
        setSelectedVendorId(newVendorId)
    }

    const handleInputChange = (fieldName: keyof UpdateItem, value: string | undefined) => {
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
                    label="Type"
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    defaultValue={selectedType ? selectedType : item.type}
                    onBlur={handleBlurType}
                    handleSelectChange={handleSelectChange}
                    options={['Unit', 'Assembly', 'Sub-Assembly', 'Part']}
                    selectedType={selectedType}
                />

                {/* <EditableField
                    label="Category"
                    defaultValue={item.category}
                    onBlur={handleBlurCategory}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) => handleInputChange('category', value)}
                /> */}

                {/* <EditableField
                    label="Location"
                    defaultValue={item.location}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurLocation}
                    handleInputChange={(value) => handleInputChange('location', value)}
                /> */}

                <EditableField
                    label="serialNumber"
                    defaultValue={item.serialNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurSerialNumber}
                    handleInputChange={(value) => handleInputChange('serialNumber', value)}
                />

                <EditableField
                    label="productNumber"
                    defaultValue={item.productNumber}
                    onBlur={handleBlurProductNumber}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    handleInputChange={(value) => handleInputChange('productNumber', value)}
                />

                <VendorField
                    label="vendor"
                    defaultValue={selectedVendorId ? selectedVendorId : item.vendor.name}
                    activeEditMode={activeEditMode}
                    setActiveEditMode={setActiveEditMode}
                    onBlur={handleBlurVendor}
                    handleSelectChange={handleVendorChange}
                    options={data}
                    id={item.vendorId}
                />

                {/* <TextField
                    onBlur={handleBlurVendor}
                    select
                    variant="standard"
                    fullWidth
                    defaultValue={selectedVendorId ? selectedVendorId : item.vendor.name}
                    onChange={handleVendorChange}
                >
                    {data.map((vendor) => (
                        <MenuItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                        </MenuItem>
                    ))}
                </TextField> */}

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
            </Container>
            {snackbar}
        </form>
    )
}

export default PartInfo
