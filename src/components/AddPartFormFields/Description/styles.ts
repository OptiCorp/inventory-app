import { styled } from 'styled-components'
import { COLORS } from '../../../style/GlobalStyles'

export const InputWrap = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 1rem;
    padding-bottom: 0.4rem;
    justify-content: space-between;
    align-items: center;
`

export const ErrorP = styled.span`
    color: ${COLORS.dangerRed};

    font-weight: 600;
`
export const StyledInput = styled.input``
