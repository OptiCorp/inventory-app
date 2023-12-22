import Select from 'react-select'
import { FormOption } from '../../../services/apiTypes.ts'

type Props = {
    options: FormOption[]
    setState: (value: FormOption) => void
    state: FormOption | null
}

export const FormSelect = ({ options, setState, state }: Props) => {
    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            width: '70%', // Set the desired width here
            maxWidth: '500px',
            height: '41px',
            backgroundColor: '#F2F2F2',
            borderRadius: 0,
            border: '0px',
            borderBottom: '1px solid #000',
        }),
        menu: (provided: any) => ({
            ...provided,
            width: '70%',
            maxWidth: '500px',
        }),
    }

    return (
        <div style={{ marginTop: '5px', marginBottom: '10px' }}>
            <Select
                maxMenuHeight={250}
                defaultValue={state}
                onChange={(selectedOption) => setState(selectedOption as FormOption)}
                options={options}
                styles={customStyles}
            />
        </div>
    )
}
