import styled from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const ButtonWrap = styled.div`
    display: flex;
    justify-content: end;
`
export const StyledTextArea = styled.textarea`
    background-color: ${COLORS.white};
    margin: 0 16px;
    max-width: 500px;
`
export const StyledInput = styled.input`
    margin: 0;
    padding: 1rem;
`

export const FormRadio = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 16px;

    label,
    input {
        padding: 8px;
        margin-right: 1rem;
        cursor: pointer;
        width: fit-content;
    }
    input {
        transform: scale(1.5);
        padding: 10rem;
    }
`
