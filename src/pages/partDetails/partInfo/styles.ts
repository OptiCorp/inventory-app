import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';
import { StyledTextFieldProps } from './types';

export const PartInfoForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 42px;
`;

export const Container = styled.div`
    display: grid;
    gap: 42px;

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

    gap: 1rem;
    p {
        margin: 0;
    }
`;

export const TypeContainer = styled.div`
    display: flex;
    align-items: center;

    gap: 2rem;
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
export const ButtonContainer = styled.div`
    display: flex;
    padding-left: 10px;
    padding-top: 20px;
    justify-content: flex-end;
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

export const StyledTextField = styled(TextField)<StyledTextFieldProps>`
    & .MuiSvgIcon-root {
        display: ${(props) => !props.$isOpen && 'none'};
    }
`;
