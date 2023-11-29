import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const Wrapper = styled.div`
    background-color: ${COLORS.white};
    border-radius: 8px;
    cursor: pointer;
    padding: 2rem;
    border: 2px solid blue;
    box-shadow: 2.5px 2.5px gray;
`

export const Box = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`
