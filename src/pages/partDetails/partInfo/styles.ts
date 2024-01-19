import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const PartInfoForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    margin-bottom: 25px;
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(1, 1fr);

    @media only screen and (min-width: 550px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (min-width: 850px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;
export const InfoContainer = styled.div`
    display: flex;
    align-items: center;

    p {
        margin: 0;
    }
`;

export const Edit = styled(EditIcon)`
    cursor: pointer;
    &:hover {
        color: #ff001e;
    }
`;

export const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const TextBoxWrap = styled.div`
    margin: 0;
`;
export const ErrorP = styled.span`
    color: ${COLORS.red};
    width: 70%;
    font-weight: 600;
`;
