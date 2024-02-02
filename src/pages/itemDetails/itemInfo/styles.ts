import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';
import { TextField } from '@mui/material';

export const ItemInfoForm = styled.form`
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

export const CreatedByContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
export const InfoContainer = styled.div`
    display: flex;
    align-items: center;

    p {
        margin: 0;
    }
`;

export const StyledTextField = styled(TextField)`
    &&& {
        margin-top: 10px;
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
