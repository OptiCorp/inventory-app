import { StylesConfig } from 'react-select';
import styled from 'styled-components';
import { FormOption } from '../../../services/apiTypes';
import { COLORS } from '../../../style/GlobalStyles';

export const StyledFormWrapper = styled.div`
    margin: 5px 0 10px 0;
`;

export const customStyles: StylesConfig<FormOption, false> = {
    control: (base) => ({
        ...base,
        width: '100%',
        maxWidth: '500px',
        height: '41px',
        backgroundColor: `${COLORS.lightGray}`,
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
