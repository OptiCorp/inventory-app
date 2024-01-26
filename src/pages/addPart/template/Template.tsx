import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useController, useFormContext } from 'react-hook-form';
// import { PartSchema } from '../hooks/partValidator.ts';
import { useEffect } from 'react';

import { useGetItemTemplates } from '../../../services/hooks/template/useGetItemTemplates.tsx';
import { PartSchema } from '../hooks/partValidator.ts';
import { Container } from './styles.ts';

export default function Template() {
    const { data: Templates = [] } = useGetItemTemplates();
    const { control, watch, setValue } = useFormContext<PartSchema>();
    const {
        field: { onChange, value },
    } = useController({
        control,

        name: 'templateData',
    });
    const selectedTemplate = watch('templateData');

    useEffect(() => {
        if (selectedTemplate) {
            setValue('templateData', selectedTemplate);
        }
    }, [selectedTemplate, setValue]);
    return (
        <Container>
            <h4>Choose a template or create a new one</h4>
            <Autocomplete
                value={value}
                onChange={(_event, newValue) => {
                    onChange(newValue);
                }}
                id="free-solo-dialog-demo"
                options={Templates}
                getOptionLabel={(option) => option.name}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="templates" />}
            />
        </Container>
    );
}
