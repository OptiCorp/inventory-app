import { useContext } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import UmAppContext from '../../contexts/UmAppContext'

export const InputsForm = () => {
    const methods = useFormContext()
    const { currentUser } = useContext(UmAppContext)
    return (
        <>
            <Controller
                control={methods.control}
                name={`Description`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="Desc"
                            placeholder="Item description"
                        />
                    )
                }}
            />
            <Controller
                control={methods.control}
                name={`SerialNumber`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="SerialNumber"
                            placeholder="Serial number"
                        />
                    )
                }}
            />
            <Controller
                control={methods.control}
                name={`ProductNumber`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="Product"
                            placeholder="ProductNumber"
                        />
                    )
                }}
            />
            <Controller
                control={methods.control}
                name={`Vendor`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="Vendor"
                            placeholder="Vendor"
                        />
                    )
                }}
            />
            <Controller
                control={methods.control}
                name={`Comment`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="Comment"
                            placeholder="Comment"
                        />
                    )
                }}
            />
            <Controller
                control={methods.control}
                name={`User`}
                rules={{
                    required: 'Required',
                }}
                render={({ field }) => {
                    return (
                        <input
                            {...field}
                            type="text"
                            name="User"
                            value={currentUser?.id}
                        />
                    )
                }}
            />
        </>
    )
}
