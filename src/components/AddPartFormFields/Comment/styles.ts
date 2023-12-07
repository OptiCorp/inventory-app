import { styled } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const InputWrap = styled.div`
    display: inline-block;
    padding-top: 1rem;
    padding-bottom: 0.4rem;
`
export const StyledTextArea = styled.textarea`
    background-color: ${COLORS.secondary};
    margin: 0;
    padding: 1rem;

    width: 60%;

    display: block;
`
