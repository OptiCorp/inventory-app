import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Category } from '../../../components/AddPartFormFields/Category/Category';
import { Comment } from '../../../components/AddPartFormFields/Comment/Comment';
import { Description } from '../../../components/AddPartFormFields/Description/Description';
import { Location } from '../../../components/AddPartFormFields/Location/Location';
import { ProductNumber } from '../../../components/AddPartFormFields/ProductNumber/ProductNumber';
import { SerialNumber } from '../../../components/AddPartFormFields/SerialNumber/SerialNumber';
import { Type } from '../../../components/AddPartFormFields/Type/Type';
import { Vendor } from '../../../components/AddPartFormFields/Vendor/Vendor';
import { WpId } from '../../../components/AddPartFormFields/WpId/WpId';
import UmAppContext from '../../../contexts/UmAppContext';
import { PartSchema } from '../hooks/partValidator';

export const FormContent = () => {
    const { currentUser } = useContext(UmAppContext);
    const { register, watch } = useFormContext<PartSchema>();
    const selectedTemplate = watch('itemTemplate.id');

    return (
        <>
            {!selectedTemplate && (
                <Box>
                    <h4> Template name</h4>
                    <TextField
                        id="filled-disabled"
                        sx={{ width: '500px' }}
                        label=""
                        placeholder="name of template"
                        variant="standard"
                        {...register('itemTemplate.name')}
                    />
                </Box>
            )}
            <Type />
            <Category />
            <WpId />
            <SerialNumber />
            <ProductNumber />
            <Vendor />
            <Location />
            <Description />

            <Comment />
            <input
                type="text"
                defaultValue={currentUser?.id}
                style={{ display: 'none' }}
                {...register('createdById', { value: currentUser?.id })}
            />
        </>
    );
};
