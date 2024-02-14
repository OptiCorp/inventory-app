import { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useDebounce } from 'usehooks-ts';
import { GlobalSpinner } from '../../../components/GlobalSpinner/GlobalSpinner';
import AppContext from '../../../contexts/AppContext';
import type { Item } from '../../../services/apiTypes';
import { useGetCategories } from '../../../services/hooks/category/useGetCategories';
import { useIsWpIdUnique } from '../../../services/hooks/items/useIsWpIdUnique';
import { useUpdateItem } from '../../../services/hooks/items/useUpdateItem';
import { useGetLocations } from '../../../services/hooks/locations/useGetLocations';
import { useGetItemTemplateById } from '../../../services/hooks/template/useGetItemTemplateById';
import { useUpdateItemTemplate } from '../../../services/hooks/template/useUpdateItemTemplate';
import { useGetVendors } from '../../../services/hooks/vendor/useGetVendors';
import { handleApiRequestSnackbar } from '../../../utils/handleApiRequestSnackbar';
import EditableField from './EditableField';
import { SelectField } from './SelectField';
import { ItemInfoSchema } from './hooks';
import { Container, CreatedByContainer, ItemInfoForm } from './styles';
import { Types } from './types';

type ItemInfoProps = {
    item: Item;
    isLoading: boolean;
};

type Field =
    | {
          label: string;
          value: Item | string;
      }
    | string;

const ItemInfo = ({ item, isLoading }: ItemInfoProps) => {
    const {
        watch,
        setValue,
        formState: { dirtyFields },
    } = useFormContext<ItemInfoSchema>();
    const { setSnackbarText, setSnackbarSeverity, currentUser } = useContext(AppContext);
    const { data: vendors = [], isLoading: isLoadingVendors } = useGetVendors();
    const { data: locations = [], isLoading: isLoadingLocations } = useGetLocations();
    const { data: categories = [], isLoading: isLoadingCategories } = useGetCategories();
    const { mutate } = useUpdateItem(item?.id, currentUser!.id);
    const { data: itemTemplateData } = useGetItemTemplateById(item.itemTemplate.id);
    const { mutate: mutateItemTemplate } = useUpdateItemTemplate(
        item.itemTemplate.id,
        currentUser!.id
    );
    const [newWpId, setNewWpId] = useState('');
    const debouncedWpId = useDebounce(newWpId, 300);
    const {
        data: isUniqueWpId,
        isLoading: isLoadingUniqueWpId,
        refetch,
    } = useIsWpIdUnique(newWpId, false);
    const wpId = watch('wpId');
    const typesOptions: Types[] = [
        { id: 'Unit', name: 'Unit' },
        { id: 'Assembly', name: 'Assembly' },
        { id: 'Subassembly', name: 'Subassembly' },
        { id: 'Part', name: 'Part' },
    ];

    useEffect(() => {
        if (newWpId && newWpId !== item.wpId) {
            refetch().catch((error) => console.error(error));
        }
    }, [newWpId, item.wpId]);

    const convertOptionsToSelectFormat = <T extends { id: string; name: string }>(
        optionsArray: T[]
    ) => {
        return optionsArray.map((option) => ({
            value: option?.id,
            label: option.name,
        }));
    };

    const handleBlurItemTemplateProperties = (field: string, fieldName: keyof ItemInfoSchema) => {
        const fieldValue: Field = watch(fieldName) as Field;
        const cleanFieldName = fieldName.replace('itemTemplate.', '');
        const { itemTemplate } = dirtyFields;

        if (itemTemplate && typeof itemTemplate === 'object') {
            if (fieldValue) {
                const mutableValue =
                    typeof fieldValue === 'string' ? fieldValue : fieldValue?.value;
                if (itemTemplateData) {
                    mutateItemTemplate(
                        {
                            ...itemTemplateData,
                            [field]: mutableValue,
                        },
                        {
                            onSuccess: (data) => {
                                handleApiRequestSnackbar(
                                    data,
                                    `${cleanFieldName} was updated`,
                                    setSnackbarSeverity,
                                    setSnackbarText
                                );
                            },
                        }
                    );
                }
            }
        }
    };

    const handleBlurItemProperties = (
        fieldId: keyof ItemInfoSchema,
        fieldName: keyof ItemInfoSchema
    ) => {
        const fieldValue: Field = watch(fieldName) as Field;
        // TODO: fix if field is changed, temp fix remove check..
        /* if (dirtyFields[fieldName] && fieldValue) { */
        const mutableValue = typeof fieldValue === 'string' ? fieldValue : fieldValue.value;
        mutate(
            {
                ...item,
                [fieldId]: mutableValue,
            },
            {
                onSuccess: (data) => {
                    handleApiRequestSnackbar(
                        data,
                        `${fieldName} was updated`,
                        setSnackbarSeverity,
                        setSnackbarText
                    );
                },
            }
        );
        /* } */
    };

    if (isLoading || isLoadingCategories || isLoadingLocations || isLoadingVendors) {
        return <GlobalSpinner />;
    }

    return (
        <ItemInfoForm>
            <Container>
                <SelectField
                    placeholder="Select location..."
                    fieldName="LOCATION"
                    label="location"
                    options={convertOptionsToSelectFormat(locations)}
                    onBlur={() => handleBlurItemProperties('locationId', 'location')}
                />

                <SelectField
                    placeholder="Select vendor..."
                    fieldName="VENDOR"
                    label="vendor"
                    options={convertOptionsToSelectFormat(vendors)}
                    onBlur={() => handleBlurItemProperties('vendorId', 'vendor')}
                />

                <EditableField
                    fieldName="S/N"
                    label="serialNumber"
                    onBlur={() => handleBlurItemProperties('serialNumber', 'serialNumber')}
                />

                <EditableField
                    fieldName="WPID"
                    label="wpId"
                    onBlur={() => {
                        if (isUniqueWpId === true) {
                            setValue('wpId', debouncedWpId);

                            handleBlurItemProperties('wpId', 'wpId');
                        }
                    }}
                    isUnique={isUniqueWpId}
                    loading={isLoadingUniqueWpId}
                    onChange={(event) => {
                        setNewWpId(event.target.value);
                    }}
                    value={wpId}
                />

                <SelectField
                    placeholder="Select type..."
                    fieldName="TYPE"
                    label="itemTemplate.type"
                    options={convertOptionsToSelectFormat(typesOptions)}
                    onBlur={() =>
                        handleBlurItemTemplateProperties(
                            'type',
                            'itemTemplate.type' as keyof ItemInfoSchema
                        )
                    }
                />
                <SelectField
                    placeholder="Select category..."
                    fieldName="CATEGORY"
                    label="itemTemplate.category"
                    options={convertOptionsToSelectFormat(categories)}
                    onBlur={() =>
                        handleBlurItemTemplateProperties(
                            'categoryId',
                            'itemTemplate.category' as keyof ItemInfoSchema
                        )
                    }
                />

                <EditableField
                    fieldName="P/N"
                    label="itemTemplate.productNumber"
                    onBlur={() =>
                        handleBlurItemTemplateProperties(
                            'productNumber',
                            'itemTemplate.productNumber' as keyof ItemInfoSchema
                        )
                    }
                />

                <CreatedByContainer>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {!item.createdBy
                            ? 'Not specified'
                            : `${item.createdBy.firstName} ${item.createdBy.lastName}`}
                    </p>
                </CreatedByContainer>
            </Container>
            <EditableField
                fieldName="DESCRIPTION"
                label="itemTemplate.description"
                isMultiLine
                rows={3}
                onBlur={() =>
                    handleBlurItemTemplateProperties(
                        'description',
                        'itemTemplate.description' as keyof ItemInfoSchema
                    )
                }
            />
        </ItemInfoForm>
    );
};

export default ItemInfo;
