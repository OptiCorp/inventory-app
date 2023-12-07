import { Dispatch, SetStateAction } from "react"
import { Select } from "./styles"

type Props = {
    setFilteredType: Dispatch<SetStateAction<string>>
}

const Filters = ({ setFilteredType }: Props) => {
    return (
        <div style={{ margin: '0 16px', display: 'flex' }}>
            <Select onChange={(event) => setFilteredType(event.currentTarget.value)}>
                <option value=''>No filter</option>
                <option value='unit'>Unit</option>
                <option value='assembly'>Assembly</option>
                <option value='subassembly'>Subassembly</option>
                <option value='part'>Part</option>
            </Select>
        </div>
    )
}

export default Filters
