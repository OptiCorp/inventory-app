import { styled } from 'styled-components'
import { COLORS } from '../../style/GlobalStyles'

export const Wrapper = styled.div`
    padding: 12px 20px;
    margin: 8px 0;

    border-style: dashed;
    border: 1px dashed ${COLORS.primary};
    border-radius: 4px;
    box-sizing: border-box;
`
export const Container = styled.div`
    padding-left: 10px;
    padding-top: 20px;
    display: flex;

    justify-content: flex-end;
`
export const StyledLabel = styled.label`
    background-color: ${COLORS.secondary};
    color: ${COLORS.primary};
    border: 1px solid ${COLORS.primary};
    cursor: pointer;
    align-self: flex-end;
    padding: 10px 40px;
`
