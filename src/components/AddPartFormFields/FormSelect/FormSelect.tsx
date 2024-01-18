import Select from 'react-select';
import { FormOption } from '../../../services/apiTypes.ts';
import { StyledFormWrapper, customStyles } from './styles.ts';

type Props = {
    options: FormOption[];
    setState: (value: FormOption) => void;
    state: FormOption | null;
};

export const FormSelect = ({ options, setState, state }: Props) => {
    return (
        <StyledFormWrapper>
            <Select
                maxMenuHeight={250}
                defaultValue={state}
                onChange={(selectedOption) => setState(selectedOption!)}
                options={options}
                styles={customStyles}
            />
        </StyledFormWrapper>
    );
};
