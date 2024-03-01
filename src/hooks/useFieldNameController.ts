import { Control, FieldValues, Path, useController } from 'react-hook-form';

// TODO: BAD? if not make the hook a separate file
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
