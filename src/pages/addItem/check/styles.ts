import styled from 'styled-components';
import { COLORS } from '../../../style/GlobalStyles';

export const ButtonWrap = styled.div`
    display: flex;

    justify-content: end;
`;
export const StyledTextArea = styled.textarea`
    background-color: ${COLORS.lightGray};
    border: none;
    border-bottom: 1px solid #000;
    margin: 0;
    display: block;
    max-width: 500px;
    padding: 1rem;
`;
export const StyledInput = styled.input`
    margin: 0;
    padding: 1rem;
`;

export const FormRadio = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 16px;
    label {
        padding: 8px;
        margin-right: 1rem;
        cursor: pointer;
        width: 20px;
    }
    input {
        transform: scale(1.5);
        padding: 10rem;
        margin-right: 1rem;
        cursor: pointer;
    }
`;
export const StyledLabelText = styled.p`
    font-weight: 600;
    display: inline;
    margin: 20px 0;
    margin-left: 10px;
`;
