import { useParams } from 'react-router-dom';
import { useGetItemTemplateById } from '../../services/hooks/template/useGetItemTemplateById';
import { SelectField } from './itemInfo/SelectField';
import { useGetCategories } from '../../services/hooks/category/useGetCategories';
import { useFormContext } from 'react-hook-form';
import { ItemInfoSchema } from './itemInfo/hooks';
import { useGetItemById } from '../../services/hooks/items/useGetItemById';
import { handleApiRequestSnackbar } from '../../utils/handleApiRequestSnackbar';
import { useUpdateItemTemplate } from '../../services/hooks/template/useUpdateItemTemplate';
import { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import { Container, CreatedByContainer, ItemInfoForm } from './itemInfo/styles';
import { EditableField } from './itemInfo/EditableField';
import { Types } from './itemInfo/types';
import { Item } from '../../services/apiTypes';
const typesOptions: Types[] = [
    { id: 'Unit', name: 'Unit' },
    { id: 'Assembly', name: 'Assembly' },
    { id: 'Subassembly', name: 'Subassembly' },
    { id: 'Part', name: 'Part' },
];
type Field =
    | {
          label: string;
          value: Item | string;
      }
    | string;
export const TemplateInfo = () => {
    const { itemId } = useParams();
    const { setSnackbarText, setSnackbarSeverity, currentUser } = useContext(AppContext);
    const { data: item } = useGetItemById(itemId!);
    const { data: categories = [], isLoading: loadingCategories } = useGetCategories();
    const { data: itemTemplateData } = useGetItemTemplateById(item?.itemTemplate.id ?? '');
    const { mutate: mutateItemTemplate } = useUpdateItemTemplate(
        item?.itemTemplate.id ?? '',
        currentUser?.id ?? ''
    );
    const {
        watch,
        formState: { dirtyFields },
    } = useFormContext<ItemInfoSchema>();

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
                            /* revision: '1.0', */ // TODO: hard coded, remove?
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

    if (loadingCategories) {
        return <>Loading</>;
    }
    return (
        <ItemInfoForm>
            <Container>
                <SelectField
                    fieldName="CATEGORY"
                    label="itemTemplate.category"
                    options={convertOptionsToSelectFormat(categories)}
                    onBlur={() =>
                        handleBlurItemTemplateProperties('categoryId', 'itemTemplate.category')
                    }
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
                <EditableField
                    fieldName="REVISION"
                    label="itemTemplate.revision"
                    onBlur={() =>
                        handleBlurItemTemplateProperties(
                            'revision',
                            'itemTemplate.revision' as keyof ItemInfoSchema
                        )
                    }
                />
                <CreatedByContainer>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {!item?.createdBy
                            ? 'Not specified'
                            : `${item?.createdBy.firstName} ${item?.createdBy.lastName}`}
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
