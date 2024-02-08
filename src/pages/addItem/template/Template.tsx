import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useGetItemTemplates } from '../../../services/hooks/template/useGetItemTemplates.tsx';
import { ItemSchema } from '../hooks/itemValidator.ts';
import { Container } from './styles.ts';

export default function Template() {
    const { data: templates = [] } = useGetItemTemplates();
    const { control, reset, watch, setValue } = useFormContext<ItemSchema>();
    const {
        field: { onChange, value },
    } = useController({
        control,
        name: 'itemTemplate',
    });
    const selectedTemplateId = watch('itemTemplate.id');
    const selectedTemplate = templates.find((template) => template.id === selectedTemplateId);

    useEffect(() => {
        if (selectedTemplate) {
            setValue('itemTemplateId', selectedTemplate?.id);
        }
    }, [selectedTemplate]);

    return (
        <>
            <Container>
                <Box sx={{ maxWidth: '500px' }}>
                    <h4>Choose a template</h4>
                    <Autocomplete
                        options={templates}
                        value={selectedTemplate ?? null}
                        onChange={(_event, template) => {
                            onChange(template);
                            reset({
                                ...watch(),
                                ...template,
                            });
                        }}
                        id="free-solo-dialog-demo"
                        selectOnFocus
                        getOptionLabel={(option) => option?.id}
                        clearOnBlur
                        handleHomeEndKeys
                        sx={{ width: '100%' }}
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        renderInput={(params) => (
                            <TextField key={value?.id} {...params} label="templates" />
                        )}
                        renderOption={(props, option) => {
                            return (
                                <Box component="li" {...props} key={option?.id}>
                                    {option?.id}
                                </Box>
                            );
                        }}
                    />
                </Box>
            </Container>
        </>
    );
}
