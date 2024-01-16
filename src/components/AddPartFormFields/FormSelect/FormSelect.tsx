import Select, { StylesConfig } from 'react-select';
import { FormOption } from '../../../services/apiTypes.ts';
import { COLORS } from '../../../style/GlobalStyles.ts';

type Props = {
    options: FormOption[];
    setState: (value: FormOption) => void;
    state: FormOption | null;
};

const customStyles: StylesConfig<FormOption, false> = {
    control: (base) => ({
        ...base,
        width: '100%', // Set the desired width here
        maxWidth: '500px',
        height: '41px',
        backgroundColor: `${COLORS.InputGray}`,
        borderRadius: 0,
        border: '0px',
        borderBottom: '1px solid #000',
    }),
    menu: (base) => ({
        ...base,
        width: '70%',
        maxWidth: '500px',
    }),
};

export const FormSelect = ({ options, setState, state }: Props) => {
    return (
        <div style={{ marginTop: '5px', marginBottom: '10px' }}>
            <Select
                maxMenuHeight={250}
                defaultValue={state}
                onChange={(selectedOption) => setState(selectedOption!)}
                options={options}
                styles={customStyles}
            />
        </div>
    );
};
