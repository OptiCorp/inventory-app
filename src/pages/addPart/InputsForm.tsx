import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import UmAppContext from '../../contexts/UmAppContext'

export const InputsForm = () => {
    const { register } = useFormContext()
    const { currentUser } = useContext(UmAppContext)
    return (
        <>
            <input
                list="types"
                placeholder="Item type"
                {...register('type', {
                    required: true,
                })}
            />
            <input
                list="types"
                placeholder="Item type"
                {...register('Type', {
                    required: true,
                })}
            />
            <datalist id="types">
                <option value="Unit" />
                <option value="Assembly" />
                <option value="Sub-assembly" />
                <option value="Part" />
            </datalist>

            <input
                type="text"
                placeholder="Item description"
                {...register('Description', {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Serial number"
                {...register('SerialNumber', {
                    valueAsNumber: true,
                    required: true,
                })}
            />

            <input
                type="text"
                value={currentUser?.id}
                style={{ display: 'none' }}
                {...(register('firstName', { value: currentUser?.id }),
                { required: true })}
            />
        </>
    )
}
