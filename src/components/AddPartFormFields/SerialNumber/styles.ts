import { styled } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles.ts'

export const InputWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    flex-wrap: wrap;
`

export const ErrorP = styled.span`
    color: red;
    margin-right: auto;
    margin-left: 20px;
    font-weight: 600;
`
export const HelperText = styled.span`
    width: 100%;
    padding-bottom: 15px;
    margin-inline: 1rem;
    font-size: 0.9rem;
    font-style: italic;
    display: list-item;
`
export const IconContainer = styled.div`
    display: flex;
    gap: 4px;
`

export const StyledInput = styled.input`
    &&& {
        background-color: ${COLORS.input};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
        margin-bottom: 0;
    }
`
