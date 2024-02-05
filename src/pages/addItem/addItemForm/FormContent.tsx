import { TextField } from '@mui/material';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from '../../../components/AddItemFormFields/Category/Category';
import { Comment } from '../../../components/AddItemFormFields/Comment/Comment';
import { Description } from '../../../components/AddItemFormFields/Description/Description';
import { Location } from '../../../components/AddItemFormFields/Location/Location';
import { ProductNumber } from '../../../components/AddItemFormFields/ProductNumber/ProductNumber';
import { SerialNumber } from '../../../components/AddItemFormFields/SerialNumber/SerialNumber';
import { Type } from '../../../components/AddItemFormFields/Type/Type';
import { Vendor } from '../../../components/AddItemFormFields/Vendor/Vendor';
import { WpId } from '../../../components/AddItemFormFields/WpId/WpId';

import AppContext from '../../../contexts/AppContext';
import { ItemSchema } from '../hooks/itemValidator';

export const FormContent = () => {
    const { currentUser } = useContext(AppContext);
    const { register } = useFormContext<ItemSchema>();

    return (
        <>
            <Type />
            <Category />
            <WpId />
            <SerialNumber />
            <ProductNumber />
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
