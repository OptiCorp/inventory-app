import { Category, DocumentType, Location, Vendor } from '../../services/apiTypes';
import { SearchType } from '../../utils/constant';
import { FormProvider, useController } from 'react-hook-form';
import { useTestForm } from './useTestForm';
import { TextField } from '@mui/material';
import { useUpdateDocumentType } from '../../services/hooks/documents/useUpdateDocumentType';
type DataUnion = Category | Vendor | Location | DocumentType;
type Props = {
    data: DataUnion;
    searchType: SearchType;
};

export const Test = ({ data, searchType }: Props) => {
    const { methods, control } = useTestForm(data.id);
    const {
        field: { value: nameValue, onChange: nameOnChange },
    } = useController({ name: 'name', control });
    console.log(data.name);
    const {
        field: { value: descriptionValue, onChange: descriptionOnChange },
    } = useController({ name: 'description', control });
    const { mutate: updateDocumentType } = useUpdateDocumentType(data.id);

    const isDocumentType = (data: DataUnion): data is DocumentType => {
        return (data as DocumentType).description !== undefined;
    };

    const handleEdit = () => {
        switch (searchType) {
            case SearchType.DocumentType: {
                if (isDocumentType(data)) {
                    const newDocumentType: /* Pick< */ DocumentType /* , 'id' | 'name'> */ = {
                        ...data,
                        id: data.id,
                        name: nameValue ? nameValue : data.name,
                        description: descriptionValue ? descriptionValue : data.description,
                    };
                    updateDocumentType(newDocumentType);
                }
            }
        }
    };

    return (
        <>
            <FormProvider {...methods}>
                <div>
                    <TextField
                        variant="outlined"
                        value={nameValue ? nameValue : data.name}
                        onChange={(newValue) => {
                            nameOnChange(newValue);
                        }}
                    />
                    {isDocumentType(data) && (
                        <TextField
                            value={descriptionValue ? descriptionValue : data.description}
                            onChange={(newValue) => {
                                descriptionOnChange(newValue);
                            }}
                        />
                    )}
                    <button type="button" onClick={handleEdit}>
                        update
                    </button>
                </div>
            </FormProvider>
        </>
    );
};
