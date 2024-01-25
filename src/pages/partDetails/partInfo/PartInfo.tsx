import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import UmAppContext from '../../../contexts/UmAppContext';
import { useSnackBar } from '../../../hooks';
import type { Category, Item, Location, Vendor } from '../../../services/apiTypes';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import { SelectField } from './SelectField';
import EditableField from './EditableField';
import { Container, PartInfoForm } from './styles';
import { Types } from './types';
import { PartInfoSchema } from './hooks';
import { useUpdateItemTemplate } from '../../../services/hooks/itemTemplates/useUpdateItemTemplate';
import { useGetItemTemplateById } from '../../../services/hooks/itemTemplates/useGetItemTemplateById';

type PartInfoProps = {
    item: Item;
    isLoading: boolean;
};

type Field =
    | {
          label: string;
          value: Item | string;
      }
    | string;

const PartInfo = ({ item, isLoading }: PartInfoProps) => {
    const {
        watch,
        formState: { dirtyFields },
    } = useFormContext<PartInfoSchema>();
    const { setSnackbarText, setSnackbarSeverity, currentUser } = useContext(UmAppContext);
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors();
    const { data: locations = [], isLoading: isLoadingLocations } = useGetLocations();
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
    const { snackbar } = useSnackBar();
    const { mutate } = useUpdateItem(item?.id, currentUser!.id);
    const { data: itemTemplateData } = useGetItemTemplateById(item.itemTemplate.id);
    const { mutate: mutateItemTemplate } = useUpdateItemTemplate(item.itemTemplate.id);

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
            value: option?.id,
            label: option.name,
        }));
    };

    const handleBlurItemTemplateProperties = (field: string, fieldName: keyof PartInfoSchema) => {
        const fieldValue: Field = watch(fieldName);
        if (fieldValue && dirtyFields[fieldName] && fieldValue !== undefined) {
            const mutableValue = typeof fieldValue === 'string' ? fieldValue : fieldValue?.value;

            if (itemTemplateData) {
                mutateItemTemplate(
                    {
                        ...itemTemplateData,
                        [field]: mutableValue,
                    },
                    {
                        onSuccess: (data) => {
                            console.log(data);
                            setSnackbarText('updated');
                        },
                    }
                );
            }
        }
    };

    /* console.log('watch values: ', watch('itemTemplate.type')); */
    const handleBlurItemProperties = (
        fieldId: keyof PartInfoSchema,
        fieldName: keyof PartInfoSchema
    ) => {
        const fieldValue = watch(fieldName);
        /* console.log('field name', fieldName);
        console.log('field value: ', fieldValue); */
        console.log('dirty field: ', dirtyFields[fieldName]);
        const updatedItem = { ...item };
        /* if (fieldName === 'itemTemplate') {
            console.log('test', fieldValue.type.value);
        }
        if (fieldName === 'itemTemplate') {
            updatedItem.itemTemplate = {
                ...item.itemTemplate,
                type: fieldValue.type,
            };
        } else {
            updatedItem[fieldId] = fieldValue;
        } */

        if (dirtyFields[fieldName] && fieldValue) {
            /* const mutableValue = typeof fieldValue === 'string' ? fieldValue : fieldValue.value; */
            let mutableValue;
            if (typeof fieldValue === 'string') {
                console.log('string');
                mutableValue = fieldValue;
            } else if (typeof fieldValue !== 'string' && fieldName === 'itemTemplate') {
                console.log('not string');
                console.log('here fieldvalue: ', fieldValue);
                console.log('here', fieldValue.type.value);
                console.log('here2', fieldValue['category'].value);
                mutableValue = fieldValue['type'].value;
            } else {
                console.log('loc', fieldValue.value);
                mutableValue = fieldValue.value;
            }

            console.log('updated item: ', mutableValue);
            /* let mutableValue = fieldValue;
            if (fieldName === 'itemTemplate') {
                mutableValue = fieldValue.type;
                console.log(mutableValue);
            } */

            mutate(
                {
                    ...item,
                    [fieldId]: mutableValue,
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
                            // TODO: Do the snackbar nned to know what it was changed to?
                            // Just say what field was updated?
                            if (fieldName === 'description') {
                                setSnackbarText(`${fieldName.toLowerCase()} was updated`);
                            } else if (typeof fieldValue !== 'string' && fieldValue.label) {
                                setSnackbarText(
                                    `${fieldName.toLowerCase()} was changed to ${fieldValue.label}`
                                );
                            } else if (fieldValue) {
                                setSnackbarText(
                                    `${fieldName.toLowerCase()} was changed to ${String(
                                        fieldValue
                                    )}`
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
                    fieldName="TYPE"
                    label="type"
                    options={convertOptionsToSelectFormat(typesOptions)}
                    onBlur={() => handleBlurItemTemplateProperties('type', 'type')}
                />
                <SelectField
                    placeholder="Select category..."
                    fieldName="CATEGORY"
                    label="category"
                    options={convertOptionsToSelectFormat(categories)}
                    onBlur={() => handleBlurItemTemplateProperties('categoryId', 'category')}
                />

                <SelectField
                    placeholder="Select location..."
                    fieldName="LOCATION"
                    label="location"
                    options={convertOptionsToSelectFormat(locations)}
                    onBlur={() => handleBlurItemProperties('locationId', 'location')}
                />

                <div>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {!item.createdBy
                            ? 'Not specified'
                            : `${item.createdBy.firstName} ${item.createdBy.lastName}`}
                    </p>
                </div>
                <EditableField
                    fieldName="S/N"
                    label="serialNumber"
                    onBlur={() => handleBlurItemProperties('serialNumber', 'serialNumber')}
                />
                <EditableField
                    fieldName="P/N"
                    label="productNumber"
                    onBlur={() =>
                        handleBlurItemTemplateProperties('productNumber', 'productNumber')
                    }
                />

                <SelectField
                    placeholder="Select vendor..."
                    fieldName="VENDOR"
                    label="vendor"
                    options={convertOptionsToSelectFormat(vendors)}
                    onBlur={() => handleBlurItemProperties('vendorId', 'vendor')}
                />
            </Container>
            <EditableField
                fieldName="DESCRIPTION"
                label="description"
                isMultiLine
                rows={3}
                onBlur={() => handleBlurItemTemplateProperties('description', 'description')}
            />

            {snackbar}
        </PartInfoForm>
    );
};

export default PartInfo;
