import { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { Item, UpdateItem } from '../../../services/apiTypes'
// import { useUpdateItem } from '../../services/hooks/useUpdateItem'

import { Item, UpdateItem } from '../../../services/apiTypes'
import { Container, Edit, InfoContainer } from './styles'

const types = ['Unit', 'Assembly', 'Sub-Assembly', 'Part']

const PartInfo = ({ item }: { item: Item }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateItem>()

    // const { mutate } = useUpdateItem(item.id)
    const [updatedFormData, setUpdatedFormData] = useState(item)

    return (
        <form>
            <Container>
                <div>
                    <label>
                        <strong>Type</strong>
                    </label>
                    <InfoContainer>
                        <select
                            style={{ width: '170px' }}
                            {...register('type')}

                            /* value={updatedFormData.type || item.type || ''} */
                        >
                            {types.map((type, idx) => (
                                <option key={idx}>{type}</option>
                            ))}
                        </select>
                        {/* <Select
                            registerString="type"
                            register={register}
                            defaultValue={item.type}
                            options={types}
                        /> */}
                        {/* <p>
                        {updatedFormData.serialNumber
                            ? updatedFormData.serialNumber
                            : item.serialNumber}
                    </p> */}
                        <Edit />
                    </InfoContainer>
                </div>

                <div>
                    <label>
                        <strong>CATEGORY</strong>
                    </label>
                    <InfoContainer>
                        <input
                        /* defaultValue={
                                updatedFormData.vendor ? updatedFormData.vendor : item.vendor
                            } */
                        /* {...register('category')} */
                        />
                        {/* <p>
                        {updatedFormData.serialNumber
                            ? updatedFormData.serialNumber
                            : item.serialNumber}
                    </p> */}
                        <Edit />
                    </InfoContainer>
                </div>
                <div>
                    <label>
                        <strong>LOCATION</strong>
                    </label>
                    <InfoContainer>
                        <input
                            defaultValue={
                                updatedFormData?.location
                                    ? updatedFormData?.location
                                    : item?.location || 'location'
                            }
                            {...register('location')}
                        />

                        {/* <p>
                        {updatedFormData.serialNumber
                            ? updatedFormData.serialNumber
                            : item.serialNumber}
                    </p> */}
                        <Edit />
                    </InfoContainer>
                </div>
                <div>
                    <label>
                        <strong>ADDED BY</strong>
                    </label>
                    <p>
                        {item.addedByFirstName === null &&
                        item.addedByLastName === null
                            ? 'Not specified'
                            : `${item.addedByFirstName} ${item.addedByLastName}`}
                    </p>
                </div>
                <div>
                    <label>
                        <strong>S/N</strong>
                    </label>
                    <InfoContainer>
                        <input
                            /* defaultValue={
                                updatedFormData.serialNumber
                                    ? updatedFormData.serialNumber
                                    : item.serialNumber
                            } */

                            {...register('serialNumber')}
                        />

                        {/* <p>
                            {updatedFormData.serialNumber
                                ? updatedFormData.serialNumber
                                : item.serialNumber}
                        </p> */}
                        <Edit />
                    </InfoContainer>
                </div>

                <div>
                    <label
                        style={{
                            lineHeight: '3rem',
                        }}
                    >
                        <strong>P/N</strong>
                    </label>
                    <InfoContainer>
                        {item.productNumber && (
                            <input
                                defaultValue={
                                    updatedFormData.productNumber
                                        ? updatedFormData.productNumber
                                        : item.productNumber
                                }
                                {...register('productNumber')}
                            />
                        )}
                        {/* <p>
                            {updatedFormData.productNumber
                                ? updatedFormData.productNumber
                                : item.productNumber}
                        </p> */}
                        <Edit />
                    </InfoContainer>
                </div>

                <div>
                    <label>
                        <strong>VENDOR</strong>
                    </label>
                    <InfoContainer>
                        <input
                            defaultValue={
                                updatedFormData.vendor
                                    ? updatedFormData.vendor
                                    : item.vendor
                            }
                            {...register('vendor')}
                        />
                        {/* <p>{updatedFormData.vendor ? updatedFormData.vendor : item.vendor}</p> */}
                        <Edit />
                    </InfoContainer>
                </div>
            </Container>
        </form>
    )
}

export default PartInfo

/* <div>
        <p>
            <strong>Type</strong>
        </p>
        <input name="type" value={type} onChange={handleChange} />
    </div> */
