import { TextField } from '@mui/material';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from '../../../components/AddItemFormFields/Category/Category';
import { Comment } from '../../../components/AddItemFormFields/Comment/Comment';
import { Description } from '../../../components/AddItemFormFields/Description/Description';
import { Location } from '../../../components/AddItemFormFields/Location/Location';
import { ProductNumber } from '../../../components/AddItemFormFields/ProductNumber/ProductNumber';
import { Revision } from '../../../components/AddItemFormFields/Revision/Revision';
import { SerialNumbers } from '../../../components/AddItemFormFields/SerialNumbers/SerialNumbers';
import { Type } from '../../../components/AddItemFormFields/TemplateTypes/TemplateTypes';
import { Vendor } from '../../../components/AddItemFormFields/Vendor/Vendor';
import { WpIds } from '../../../components/AddItemFormFields/WpIds/WpIds';
import AppContext from '../../../contexts/AppContext';
import { ItemSchema } from '../hooks/itemValidator';

export const FormContent = () => {
    const { currentUser } = useContext(AppContext);
    const { register } = useFormContext<ItemSchema>();

    return (
        <>
            <Type />
            <Category />
            <WpIds />
            <SerialNumbers />
            <ProductNumber />
            <Revision />
            <Vendor />
            <Location />
            <Description />
            <Comment />
            <TextField
                id="filled-disabled"
                sx={{ display: 'none' }}
                label=""
                {...register('createdById', { value: currentUser?.id })}
            />
        </>
    );
};
