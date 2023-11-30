import { useFormContext } from 'react-hook-form'

export const TypesOptions = () => {
    const { register } = useFormContext()

    return (
        <>
            <input
                list="types"
                pattern="unit|assembly|sub-assembly|sart"
                placeholder="Item type"
                {...register('type', {
                    required: true,
                })}
            />
            <datalist id="types">
                <option value="unit" />
                <option value="assembly" />
                <option value="sub-assembly" />
                <option value="sart" />
            </datalist>
        </>
    )
}
