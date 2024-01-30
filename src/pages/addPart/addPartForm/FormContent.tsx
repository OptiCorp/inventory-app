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

export const FormContent = () => {
    const { currentUser } = useContext(UmAppContext);
    const { register } = useFormContext();

    // const selectedTemplate = watch('templateData') as ItemTemplate | undefined;

    // useEffect(() => {
    //     if (selectedTemplate) {
    //         setValue('productNumber', selectedTemplate.productNumber);

    //         setValue('type', selectedTemplate.type);
    //           setValue('categoryId', selectedTemplate.category.id);
    //         setValue('description', selectedTemplate.description);
    //     }
    // }, [selectedTemplate, setValue]);
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
            <input
                type="text"
                defaultValue={currentUser?.id}
                style={{ display: 'none' }}
                {...register('addedById', { value: currentUser?.id })}
            />
        </>
    );
};
