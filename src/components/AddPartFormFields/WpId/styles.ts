import { styled } from 'styled-components'

export const InputWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    flex-wrap: wrap;
`

export const ErrorP = styled.span`
    color: red;
    width: 70%;

    font-weight: 600;
`
export const StyledInput = styled.input`
    &&& {
        background-color: #f2f2f2;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
    }
`

export const IconContainer = styled.div`
    display: flex;
    gap: 4px;
`
