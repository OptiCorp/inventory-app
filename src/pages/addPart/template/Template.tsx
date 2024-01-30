import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
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
        if (selectedTemplate?.id) {
            setValue('templateData', selectedTemplate);
        }
    }, [selectedTemplate?.id]);

    return (
        <Container>
            <h4>Choose a template or create a new one</h4>
            <Autocomplete
                value={value}
                onChange={(_event, newValue) => {
                    onChange(newValue);
                }}
                id="free-solo-dialog-demo"
                options={Templates ?? ''}
                getOptionLabel={(option) => option.name}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                    <TextField key={value?.id} {...params} label="templates" />
                )}
                renderOption={(props, option) => {
                    return (
                        <Box component="li" {...props} key={option.id}>
                            {option.name}
                        </Box>
                    );
                }}
            />
        </Container>
    );
}
