import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import UmAppContext from '../../../contexts/UmAppContext';
import { useSnackBar } from '../../../hooks';
import type { Category, Item, Location, Vendor } from '../../../services/apiTypes';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import { PartInfoSchema } from './hooks/useUpdatePartForm';
import { SelectField } from './SelectField';
import EditableField from './EditableField';

import { Container, PartInfoForm } from './styles';
import { Types } from './types';

type PartInfoProps = {
    item: Item;
    isLoading: boolean;
};

const PartInfo = ({ item, isLoading }: PartInfoProps) => {
    const {
        watch,
        formState: { isDirty, dirtyFields },
    } = useFormContext<PartInfoSchema>();
    const { setSnackbarText, setSnackbarSeverity, currentUser } = useContext(UmAppContext);
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors();
    const { data: locations = [], isLoading: isLoadingLocations } = useGetLocations();
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
    const { snackbar } = useSnackBar();
    const { mutate } = useUpdateItem(item.id, currentUser!.id);

    const typesOptions: Types[] = [
        { id: 'Unit', name: 'Unit' },
        { id: 'Assembly', name: 'Assembly' },
        { id: 'Subassembly', name: 'Subassembly' },
        { id: 'Part', name: 'Part' },
    ];

    const convertOptionsToSelectFormat = (
        optionsArray: Category[] | Vendor[] | Location[] | Types[]
    ) => {
        return optionsArray.map((option) => ({
            value: option.id,
            label: option.name,
        }));
    };
    const handleBlur = (fieldId: keyof PartInfoSchema, fieldName: keyof PartInfoSchema) => {
        const fieldValue = watch(fieldName);
        if (isDirty && dirtyFields[fieldName] && fieldValue) {
            mutate(
                {
                    ...item,
                    [fieldId]: typeof fieldValue === 'string' ? fieldValue : fieldValue.value,
                },
                {
                    onSuccess: (data) => {
                        if (data.status >= 400 && data.status < 500) {
                            setSnackbarSeverity('error');
                            setSnackbarText(`${data.statusText}, please try again.`);
                            return;
                        } else if (data.status >= 500) {
                            setSnackbarSeverity('error');
                            setSnackbarText(
                                `Something went wrong on our end, refresh page and try again later.`
                            );
                            return;
                        } else {
                            if (fieldName === 'description') {
                                setSnackbarText(`${fieldName.toLowerCase()} was updated`);
                            } else if (typeof fieldValue !== 'string' && fieldValue.label) {
                                setSnackbarText(
                                    `${fieldName.toLowerCase()} was changed to ${fieldValue.label}`
                                );
                            } else if (fieldValue) {
                                setSnackbarText(
                                    `${fieldName.toLowerCase()} was changed to ${fieldValue}`
                                );
                            }
                        }
                    },
                }
            );
        }
    };

    if (isLoading || isLoadingCategories || isLoadingLocations || isLoadingVendors) {
        return <p>Loading.. </p>;
    }

    return (
        <PartInfoForm>
            <Container>
                <SelectField
                    placeholder="Select type..."
                    label="type"
                    options={convertOptionsToSelectFormat(typesOptions)}
                    onBlur={() => handleBlur('type', 'type')}
                />
                <SelectField
                    placeholder="Select category..."
                    label="category"
                    options={convertOptionsToSelectFormat(categories)}
                    onBlur={() => handleBlur('categoryId', 'category')}
                />
                <SelectField
                    placeholder="Select vendor..."
                    label="vendor"
                    options={convertOptionsToSelectFormat(vendors)}
                    onBlur={() => handleBlur('vendorId', 'vendor')}
                />

                <SelectField
                    placeholder="Select location..."
                    label="location"
                    options={convertOptionsToSelectFormat(locations)}
                    onBlur={() => handleBlur('locationId', 'location')}
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
                    isMultiLine={false}
                    onBlur={() => handleBlur('productNumber', 'productNumber')}
                />

                <EditableField
                    label="serialNumber"
                    isMultiLine={false}
                    onBlur={() => handleBlur('serialNumber', 'serialNumber')}
                />
            </Container>
            <EditableField
                label="description"
                isMultiLine
                rows={3}
                onBlur={() => handleBlur('description', 'description')}
            />

            {snackbar}
        </PartInfoForm>
    );
};

export default PartInfo;
