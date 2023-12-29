import styled from 'styled-components'

export const FormBatchRadio = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 16px;

    label {
        padding: 8px;
        margin-right: 1rem;
        cursor: pointer;
        width: fit-content;
    }
    input {
        transform: scale(1.5);
        padding: 10rem;
        margin-right: 1rem;
        cursor: pointer;
    }
`

export const StyledInput = styled.input`
    && {
        width: auto;
        margin: 13px;
    }
`

export const RadioWrapper = styled.div`
    display: flex;
`
