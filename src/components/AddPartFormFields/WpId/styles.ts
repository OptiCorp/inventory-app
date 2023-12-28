import { styled } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles.ts'

interface StyledInputProps {
    isUnique?: string | undefined
}
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
export const StyledInput = styled.input<StyledInputProps>`
    &&& {
        background-color: ${COLORS.input};
        border: none;
        border-radius: 0;
        border-bottom: 1px solid #000;
        border: ${(props) => (props.isUnique === 'false' ? '1px solid red' : null)};
    }
`

export const IconContainer = styled.div`
    display: flex;
    gap: 4px;
`
