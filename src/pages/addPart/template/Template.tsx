import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import React from 'react';
// import { useController, useFormContext } from 'react-hook-form';
import { Category } from '../../../services/apiTypes.ts';
// import { PartSchema } from '../hooks/partValidator.ts';
import { Container } from './styles.ts';

export default function Template() {
    const [value, setValue] = React.useState<TemplateProps | null>(null);
    // const { control } = useFormContext<PartSchema>();
    // const {
    //     field: { onChange, value: fieldValue },
    //     fieldState: { error },
    // } = useController({
    //     control,
    //     name: 'templateData',
    // });

    return (
        <Container>
            <h4>Choose a template or create a new one</h4>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                id="free-solo-dialog-demo"
                options={Templates}
                getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
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

interface TemplateProps {
    inputValue?: string;
    name: string;
    id: string;
    category: Category;
    type: string;
    productNumber: string;
    description: string;
}

const Templates: readonly TemplateProps[] = [
    {
        name: 'Stainless steel pan head skrew',
        id: '1793b64d-703c-4c8e-8b83-de49a434g2a',
        category: { id: '455452fsdfds5', name: 'skrews', userId: '34234fsdfrq' },
        type: 'Part',
        productNumber: 'productnumber23',
        description:
            'Coarse self drilling thread,No 1 hardened carbon steel self drilling reduced point',
    },
    {
        name: 'Round Wire Bright Nails',
        id: '1221b64d-703c-4c8e-9y83-de49a003g2a',
        category: { id: '45768dfds5', name: 'nails', userId: '34234fsdfrq' },
        type: 'Assembly',
        productNumber: 'productnumber34',
        description:
            'CRound Head Nails are multi-purpose nails, for use with both soft and hard timber materials. ',
    },
];
