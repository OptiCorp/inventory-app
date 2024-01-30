import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useController, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
import { useGetItemTemplates } from '../../../services/hooks/template/useGetItemTemplates.tsx';
import { PartSchema } from '../hooks/partValidator.ts';
import { Container } from './styles.ts';

export default function Template() {
    const { data: templates = [] } = useGetItemTemplates();
    const { control, reset, watch } = useFormContext<PartSchema>();
    const {
        field: { onChange, value },
    } = useController({
        control,

        name: 'templateData',
    });
    console.log(watch());
    const selectedTemplate = templates.find((option) => option.id === value?.id);

    return (
        <Container>
            <h4>Choose a template or create a new one</h4>
            <Autocomplete
                options={templates}
                value={selectedTemplate}
                onChange={(_event, template) => {
                    onChange(template);
                    console.log(template);
                    reset({
                        ...template,
                    });
                }}
                id="free-solo-dialog-demo"
                selectOnFocus
                getOptionLabel={(option) => option.name}
                clearOnBlur
                handleHomeEndKeys
                sx={{ width: 300 }}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                renderInput={(params) => (
                    <TextField key={value?.id} {...params} label="templates" />
                )}
                renderOption={(props, option) => {
                    return (
                        <Box component="li" {...props} key={option?.id}>
                            {option?.name}
                        </Box>
                    );
                }}
            />
        </Container>
    );
}
