import { Control, FieldValues, Path, useController } from 'react-hook-form';

// TODO: Maybe not needed? remove and refactor where it is used?
export const useFieldNameController = <T extends FieldValues>(
    name: Path<T>,
    control: Control<T>
) => {
    const {
        field: { onChange, value },
    } = useController({
        control,
        name,
    });
    return {
        onChange,
        value,
    };
};
